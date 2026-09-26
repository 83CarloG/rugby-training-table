import { ease, lerp } from "./utils.js";
import { C } from "./constants.js";

export const SPEEDS = [0.5, 1, 1.5];

export function prepareScenario(raw, ballRoutes = []) {
  if (raw.type === "image") return raw;
  let elapsed = 0;
  const phases = raw.phases.map((phase, index) => {
    const route = ballRoutes[index] || [];
    const durationMs = index === 0 ? 2200 : route.length > 2 ? 3600 : 3000;
    const startMs = elapsed;
    elapsed += durationMs;
    const lastOwner = route.at(-1);
    const events = route.slice(1).map((to, i) => ({
      type: "pass",
      from: route[i],
      to,
      at: 0.2 + (0.62 * i) / (route.length - 1),
    }));
    if (/attacc|avanz|carry|crash/i.test(phase.name) && lastOwner != null) {
      events.push({ type: "carry", actor: lastOwner, at: 0.84 });
    }
    if (/ruck/i.test(phase.name) && lastOwner != null) {
      events.push({ type: "ruck", actor: lastOwner, at: 0.9 });
    }
    const keyframes = Object.fromEntries(phase.players.map(player => {
      const sequence = route.indexOf(player.id);
      return [player.id, sequence === -1
        ? { start: 0.08, end: 0.88 }
        : { start: 0.04 + sequence * 0.13, end: Math.min(0.96, 0.68 + sequence * 0.1) }];
    }));
    return {
      ...phase,
      id: `phase-${index + 1}`,
      startMs,
      durationMs,
      ballRoute: route,
      keyframes,
      defense: (phase.defense || []).map((defender, i) => ({ ...defender, id: `defender-${i + 1}` })),
      events,
    };
  });
  return { ...raw, phases, totalDuration: elapsed };
}

export function validateScenario(scenario) {
  if (scenario.type === "image") return [];
  const errors = [];
  if (!scenario.phases.length) errors.push("scenario senza fasi");
  scenario.phases.forEach((phase, index) => {
    const prefix = `fase ${index + 1}`;
    const ids = new Set();
    const numbers = new Set();
    for (const player of phase.players) {
      if (ids.has(player.id)) errors.push(`${prefix}: id ${player.id} duplicato`);
      if (numbers.has(player.n)) errors.push(`${prefix}: numero ${player.n} duplicato`);
      if (![player.x, player.y].every(Number.isFinite)) errors.push(`${prefix}: coordinate non valide`);
      ids.add(player.id);
      numbers.add(player.n);
    }
    if (!phase.ballRoute.length) errors.push(`${prefix}: percorso palla mancante`);
    for (const id of phase.ballRoute) {
      if (!ids.has(id)) errors.push(`${prefix}: giocatore ${id} del percorso palla assente`);
    }
    for (const [id, frame] of Object.entries(phase.keyframes)) {
      if (!ids.has(Number(id)) || frame.start < 0 || frame.end > 1 || frame.start >= frame.end) {
        errors.push(`${prefix}: keyframe ${id} non valido`);
      }
    }
    if (!Number.isFinite(phase.durationMs) || phase.durationMs <= 0) errors.push(`${prefix}: durata non valida`);
  });
  return errors;
}

export function clampTime(scenario, timeMs) {
  return Math.max(0, Math.min(scenario.totalDuration || 0, Number.isFinite(timeMs) ? timeMs : 0));
}

export function phaseIndexAt(scenario, timeMs) {
  const time = clampTime(scenario, timeMs);
  const index = scenario.phases.findIndex(phase => time < phase.startMs + phase.durationMs);
  return index === -1 ? Math.max(0, scenario.phases.length - 1) : index;
}

function interpolateActors(previous, current, progress, keyframes = {}) {
  const before = new Map((previous || []).map(actor => [actor.id, actor]));
  const after = new Map(current.map(actor => [actor.id, actor]));
  const actors = current.map(actor => {
    const prior = before.get(actor.id);
    const frame = keyframes[actor.id] || { start: 0, end: 1 };
    const amount = ease(Math.max(0, Math.min(1, (progress - frame.start) / (frame.end - frame.start))));
    return prior
      ? { ...actor, x: lerp(prior.x, actor.x, amount), y: lerp(prior.y, actor.y, amount), opacity: 1 }
      : { ...actor, opacity: Math.min(1, amount * 3) };
  });
  for (const actor of previous || []) {
    if (!after.has(actor.id)) actors.push({ ...actor, opacity: Math.max(0, 1 - progress * 3), leaving: true });
  }
  return actors;
}

function sampleBall(phase, players, progress) {
  const byId = new Map(players.map(player => [player.id, player]));
  const route = phase.ballRoute;
  if (!route.length) return null;
  let owner = route[0];
  let position = byId.get(owner);
  let state = phase.name.toLowerCase().includes("ruck") ? "ruck" : "held";
  if (route.length > 1 && progress >= 0.2) {
    const passage = Math.min(route.length - 1, ((progress - 0.2) / 0.62) * (route.length - 1));
    const fromIndex = Math.min(route.length - 2, Math.floor(passage));
    const fraction = passage - fromIndex;
    const from = byId.get(route[fromIndex]);
    const to = byId.get(route[fromIndex + 1]);
    if (from && to) {
      if (fraction < 0.86) {
        position = { x: lerp(from.x, to.x, fraction / 0.86), y: lerp(from.y, to.y, fraction / 0.86) };
        owner = null;
        state = "pass";
      } else {
        position = to;
        owner = route[fromIndex + 1];
        state = "held";
      }
    }
  }
  if (progress >= 0.82) {
    owner = route.at(-1);
    position = byId.get(owner);
    state = phase.name.toLowerCase().includes("ruck") ? "ruck" : "held";
  }
  return position ? {
    x: position.x + (owner ? 12 : 0),
    y: position.y - (owner ? 13 : 0),
    owner,
    state,
  } : null;
}

export function sampleScenario(scenario, timeMs, reducedMotion = false, jumpFrom = null) {
  const index = phaseIndexAt(scenario, timeMs);
  const phase = scenario.phases[index];
  if (!phase) return null;
  const rawProgress = Math.max(0, Math.min(1, (clampTime(scenario, timeMs) - phase.startMs) / phase.durationMs));
  const progress = reducedMotion ? 1 : rawProgress;
  const previous = jumpFrom?.phaseIndex === index ? jumpFrom : scenario.phases[index - 1];
  const amount = previous ? ease(progress) : 1;
  const actorsProgress = previous ? progress : 1;
  const players = interpolateActors(previous?.players, phase.players, actorsProgress, phase.keyframes);
  const defense = interpolateActors(previous?.defense, phase.defense, actorsProgress);
  return {
    index,
    phase,
    progress: rawProgress,
    players,
    defense,
    ball: sampleBall(phase, players, progress),
    currentEvent: [...phase.events].reverse().find(event => event.at <= progress) || null,
    lineOpacity: reducedMotion || !previous ? 1 : Math.max(0, Math.min(1, (progress - 0.28) / 0.3)),
    gainLine: previous ? lerp(previous.gl || phase.gl, phase.gl, amount) : phase.gl,
  };
}

export function playerDetail(sample, player) {
  const route = sample.phase.ballRoute;
  const routeIndex = route.indexOf(player.id);
  const group = player.c;
  const sameGroup = sample.phase.players
    .filter(other => other.id !== player.id && other.c === group)
    .sort((a, b) => Math.hypot(a.x - player.x, a.y - player.y) - Math.hypot(b.x - player.x, b.y - player.y))
    .slice(0, 3)
    .map(other => other.n);
  const closest = sample.phase.players
    .filter(other => other.id !== player.id)
    .sort((a, b) => Math.hypot(a.x - player.x, a.y - player.y) - Math.hypot(b.x - player.x, b.y - player.y))
    .slice(0, 2)
    .map(other => other.n);
  const groupActions = {
    [C.mischia]: "Mantiene la struttura degli avanti e si prepara al rilancio.",
    [C.pod1]: "Si muove con il pod rosso per offrire sostegno al portatore.",
    [C.pod2]: "Si muove con il pod blu per offrire sostegno al portatore.",
    [C.ruck]: "Lavora vicino al punto d'incontro per mantenere il possesso.",
    [C.onda]: "Segue l'azione in sostegno, pronto al punto d'incontro.",
    [C.med]: "Legge la difesa e si prepara a distribuire la palla.",
    [C.backs]: "Mantiene profondità e offre una linea di passaggio.",
    [C.centro]: "Mantiene profondità e offre una linea di corsa.",
    [C.larghi]: "Si apre verso lo spazio esterno.",
  };
  let action = groupActions[player.c] || "Si riallinea e si prepara alla fase successiva.";
  if (routeIndex >= 0 && routeIndex < route.length - 1) action = `Passa la palla al numero ${route[routeIndex + 1]}.`;
  else if (routeIndex === route.length - 1) action = routeIndex === 0 ? "Gestisce il possesso in questa fase." : "Riceve la palla e prosegue l'azione.";
  return {
    action,
    support: (sameGroup.length ? sameGroup : closest).join(" · "),
    supportLabel: sameGroup.length ? "Compagni del gruppo" : "Compagni vicini",
  };
}
