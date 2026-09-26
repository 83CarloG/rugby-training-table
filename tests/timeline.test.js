import test from "node:test";
import assert from "node:assert/strict";
import { ballRoutes } from "../src/data/timeline-meta.js";
import { prepareScenario, sampleScenario, validateScenario, phaseIndexAt } from "../src/timeline.js";
import { initialPlayback, playbackReducer } from "../src/playback.js";

const scenarios = Object.fromEntries(await Promise.all(
  Object.keys(ballRoutes).map(async key => [key, prepareScenario((await import(`../src/data/${key}.js`)).default, ballRoutes[key])]),
));

test("tutti gli otto scenari e le 43 fasi hanno dati validi", () => {
  assert.equal(Object.keys(scenarios).length, 8);
  assert.equal(Object.values(scenarios).reduce((sum, scenario) => sum + scenario.phases.length, 0), 43);
  for (const [key, scenario] of Object.entries(scenarios)) {
    assert.deepEqual(validateScenario(scenario), [], key);
    assert.ok(scenario.totalDuration > 0);
  }
});

test("ogni fase produce fotogrammi finiti per palla, giocatori e difesa", () => {
  for (const scenario of Object.values(scenarios)) {
    for (const phase of scenario.phases) {
      for (const fraction of [0, .35, .75, .999]) {
        const sample = sampleScenario(scenario, phase.startMs + phase.durationMs * fraction);
        assert.ok(sample.ball && Number.isFinite(sample.ball.x) && Number.isFinite(sample.ball.y));
        assert.ok(sample.players.every(player => Number.isFinite(player.x) && Number.isFinite(player.y) && player.opacity >= 0));
        assert.ok(sample.defense.every(defender => Number.isFinite(defender.x) && Number.isFinite(defender.y)));
      }
    }
  }
});

test("il primo fotogramma mostra subito giocatori, difesa e palla", () => {
  const sample = sampleScenario(scenarios["mischia-sinistra"], 0);
  assert.equal(sample.index, 0);
  assert.ok(sample.players.length > 0);
  assert.ok(sample.players.every(player => player.opacity === 1));
  assert.ok(sample.defense.every(defender => defender.opacity === 1));
  assert.equal(sample.ball.owner, 9);
});

test("giocatori, difesa e palla sono campionati nello stesso tempo", () => {
  const scenario = scenarios["mischia-sinistra"];
  const phase = scenario.phases[1];
  const sample = sampleScenario(scenario, phase.startMs + phase.durationMs * .35);
  assert.equal(sample.index, 1);
  assert.equal(sample.ball.state, "pass");
  const numberTen = sample.players.find(player => player.id === 10);
  const before = scenario.phases[0].players.find(player => player.id === 10);
  const after = phase.players.find(player => player.id === 10);
  assert.ok(numberTen.y > Math.min(before.y, after.y) && numberTen.y < Math.max(before.y, after.y));
  assert.ok(sample.defense[0].y > Math.min(scenario.phases[0].defense[0].y, phase.defense[0].y));
});

test("salto, cambio scenario e tick tardivo non invalidano la fase", () => {
  const long = scenarios["mischia-sinistra"];
  const short = scenarios["giocata-rossa"];
  let state = initialPlayback("mischia-sinistra");
  state = playbackReducer(state, { type: "PHASE", scenario: long, index: 7 });
  assert.equal(phaseIndexAt(long, state.timeMs), 7);
  state = playbackReducer(state, { type: "SCENARIO", key: "giocata-rossa" });
  assert.equal(state.timeMs, 0);
  assert.equal(state.playing, false);
  state = playbackReducer(state, { type: "TICK", key: "mischia-sinistra", scenario: long, deltaMs: 5000 });
  assert.equal(state.timeMs, 0);
  assert.equal(sampleScenario(short, state.timeMs).index, 0);
});

test("un salto parte dal fotogramma visibile e si ferma sulla fase scelta", () => {
  const scenario = scenarios["mischia-sinistra"];
  const before = sampleScenario(scenario, 0);
  let state = initialPlayback("mischia-sinistra");
  state = playbackReducer(state, { type: "PHASE", scenario, sample: before, index: 6 });
  const first = sampleScenario(scenario, state.timeMs, false, state.jumpFrom);
  assert.equal(first.index, 6);
  assert.equal(first.players.find(player => player.id === 9).x, before.players.find(player => player.id === 9).x);
  assert.equal(state.playing, true);
  state = playbackReducer(state, { type: "TICK", key: "mischia-sinistra", scenario, deltaMs: 100000 });
  assert.equal(state.playing, false);
  assert.equal(phaseIndexAt(scenario, state.timeMs), 6);
  const last = sampleScenario(scenario, state.timeMs, false, state.jumpFrom);
  assert.ok(Math.abs(last.players.find(player => player.id === 9).x - scenario.phases[6].players.find(player => player.id === 9).x) < 1);
});

test("pausa, ripresa, velocità e fine riproduzione", () => {
  const scenario = scenarios["giocata-blu"];
  let state = initialPlayback("giocata-blu");
  state = playbackReducer(state, { type: "PLAY", scenario });
  state = playbackReducer(state, { type: "SPEED", speed: 1.5 });
  state = playbackReducer(state, { type: "TICK", key: "giocata-blu", scenario, deltaMs: 1000 });
  assert.equal(state.timeMs, 1500);
  state = playbackReducer(state, { type: "PAUSE" });
  state = playbackReducer(state, { type: "TICK", key: "giocata-blu", scenario, deltaMs: 1000 });
  assert.equal(state.timeMs, 1500);
  state = playbackReducer(state, { type: "PLAY", scenario });
  assert.equal(state.timeMs, 1500);
  state = playbackReducer(state, { type: "TICK", key: "giocata-blu", scenario, deltaMs: scenario.totalDuration });
  assert.equal(state.timeMs, scenario.totalDuration);
  assert.equal(state.playing, false);
  state = playbackReducer(state, { type: "PLAY", scenario });
  assert.equal(state.timeMs, 0);
});

test("la modalità con movimento ridotto mostra la posizione finale della fase", () => {
  const scenario = scenarios["touche-destra"];
  const phase = scenario.phases[1];
  const sample = sampleScenario(scenario, phase.startMs, true);
  assert.equal(sample.players.find(player => player.id === 4).x, phase.players.find(player => player.id === 4).x);
  assert.equal(sample.lineOpacity, 1);
});

test("la selezione si chiude quando il giocatore non è nella fase", () => {
  const scenario = scenarios["mischia-sinistra"];
  let state = initialPlayback("mischia-sinistra");
  state = playbackReducer(state, { type: "SELECT_PLAYER", id: 12 });
  assert.equal(state.selectedPlayer, 12);
  state = playbackReducer(state, { type: "PHASE", scenario, sample: sampleScenario(scenario, 0), index: 3 });
  assert.equal(state.selectedPlayer, null);
});
