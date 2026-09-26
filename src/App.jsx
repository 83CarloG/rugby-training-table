import { useEffect, useReducer, useState } from "react";
import "./App.css";
import sourceScenarios from "./data/index.js";
import { ballRoutes } from "./data/timeline-meta.js";
import { playerDetail, prepareScenario, sampleScenario } from "./timeline.js";
import { initialPlayback, playbackReducer } from "./playback.js";
import FieldView from "./components/FieldView.jsx";
import PhaseNav from "./components/PhaseNav.jsx";
import ScenarioMenu from "./components/ScenarioMenu.jsx";
import HomeMenu from "./components/HomeMenu.jsx";
import TattichePage from "./components/TattichePage.jsx";
import Legend from "./components/Legend.jsx";

const scenarios = Object.fromEntries(Object.entries(sourceScenarios).map(([key, scenario]) => [key, prepareScenario(scenario, ballRoutes[key])]));

const GROUPS = [
  { label: "Mischia", items: [
    { key: "mischia-sinistra", label: "A sinistra · uscita a destra" },
    { key: "mischia-destra", label: "A destra · uscita a sinistra" },
  ] },
  { label: "Touche", items: [
    { key: "touche-sinistra", label: "A sinistra" },
    { key: "touche-destra", label: "A destra" },
  ] },
  { label: "Giocate", items: [
    { key: "giocata-rossa", label: "Rossa · pod corto" },
    { key: "giocata-blu", label: "Blu · pod dopo il 10" },
    { key: "giocata-verde-scudo", label: "Verde · scudo" },
    { key: "giocata-verde-ondata", label: "Verde · ondata" },
  ] },
  { label: "Calci", items: [
    { key: "calcio-attacco", label: "Calcio d'inizio · attacco" },
    { key: "calcio-ricezione", label: "Calcio d'inizio · ricezione" },
  ] },
];

const ROLES = {
  1: "Pilone sinistro", 2: "Tallonatore", 3: "Pilone destro", 4: "Seconda linea", 5: "Seconda linea",
  6: "Terza linea", 7: "Terza linea", 8: "Numero otto", 9: "Mediano di mischia", 10: "Mediano d'apertura",
  11: "Ala", 12: "Primo centro", 13: "Secondo centro", 14: "Ala", 15: "Estremo",
};

export default function App() {
  const [view, setView] = useState("home");
  const [state, dispatch] = useReducer(playbackReducer, "mischia-sinistra", initialPlayback);
  const [systemReducedMotion, setSystemReducedMotion] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false);
  const [motionOverride, setMotionOverride] = useState(null);
  const [imageZoomed, setImageZoomed] = useState(false);
  const reducedMotion = motionOverride ?? systemReducedMotion;
  const scenario = scenarios[state.scenarioKey];
  const sample = scenario.type === "image" ? null : sampleScenario(scenario, state.timeMs, reducedMotion, state.jumpFrom);
  const phase = sample?.phase;
  const selected = phase?.players.find(player => player.id === state.selectedPlayer);
  const detail = selected ? playerDetail(sample, selected) : null;

  useEffect(() => { window.scrollTo(0, 0); }, [view, state.scenarioKey]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = event => setSystemReducedMotion(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!state.playing || view !== "playbook" || scenario.type === "image") return;
    let frame;
    let previous = null;
    const key = state.scenarioKey;
    function tick(now) {
      if (previous !== null) dispatch({ type: "TICK", key, scenario, deltaMs: Math.min(100, now - previous) });
      previous = now;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state.playing, state.scenarioKey, view, scenario]);

  useEffect(() => {
    if (view !== "playbook" || scenario.type === "image") return;
    function onKeyDown(event) {
      if (!["BODY", "HTML"].includes(document.activeElement?.tagName)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        dispatch({ type: "PHASE", scenario, sample, index: Math.min(scenario.phases.length - 1, sample.index + 1) });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        dispatch({ type: "PHASE", scenario, sample, index: Math.max(0, sample.index - 1) });
      } else if (event.key === " ") {
        event.preventDefault();
        dispatch({ type: state.playing ? "PAUSE" : "PLAY", scenario });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, scenario, sample?.index, state.playing]);

  function selectScenario(key) {
    setImageZoomed(false);
    dispatch({ type: "SCENARIO", key });
  }

  function goHome() {
    dispatch({ type: "PAUSE" });
    setView("home");
  }

  return (
    <div className="app-wrap">
      <header className="app-header">
        {view !== "home" && <button className="header-back" type="button" onClick={goHome} aria-label="Torna alla home">←</button>}
        <span className="header-label">ARN · Sistema Tattico</span>
      </header>

      {view === "home" && <HomeMenu onSelect={setView} />}

      {view === "playbook" && (
        <main className="app-inner">
          <ScenarioMenu groups={GROUPS} activeKey={state.scenarioKey} onSelect={selectScenario} />
          <div className="playbook-heading">
            <div>
              <p className="eyebrow">Playbook · studio delle giocate</p>
              <h1 className="scenario-title">{scenario.title}</h1>
            </div>
            {sample && <span className="phase-count">{scenario.phases.length} fasi</span>}
          </div>

          {scenario.type === "image" ? (
            <section className="image-section" aria-label={scenario.title}>
              <div className="image-actions">
                <p>Schema statico · usa il pulsante per leggere i dettagli.</p>
                <button type="button" onClick={() => setImageZoomed(value => !value)}>{imageZoomed ? "Adatta allo schermo" : "Ingrandisci"}</button>
              </div>
              <div className={`image-panel ${imageZoomed ? "image-panel--zoomed" : ""}`}>
                <img src={scenario.imageSrc} alt={scenario.description} />
              </div>
              <p className="image-description">{scenario.description}</p>
            </section>
          ) : (
            <>
              <section className="study-summary" aria-live="polite">
                <span className="study-summary-index">{sample.index + 1} / {scenario.phases.length}</span>
                <div>
                  <h2>{phase.name.replace(/^\d+\.\s*/, "")}</h2>
                  <p>{phase.obj}</p>
                </div>
              </section>

              <div className="view-options" role="group" aria-label="Vista del campo">
                <button type="button" aria-pressed={state.viewMode === "focus"} className={state.viewMode === "focus" ? "is-active" : ""} onClick={() => dispatch({ type: "VIEW", mode: "focus" })}>Focus</button>
                <button type="button" aria-pressed={state.viewMode === "overview"} className={state.viewMode === "overview" ? "is-active" : ""} onClick={() => dispatch({ type: "VIEW", mode: "overview" })}>Campo intero</button>
                <button type="button" className="motion-button" aria-pressed={reducedMotion} onClick={() => setMotionOverride(!reducedMotion)}>{reducedMotion ? "Movimento ridotto: sì" : "Movimento ridotto"}</button>
              </div>

              <FieldView
                scenario={scenario}
                sample={sample}
                selectedPlayer={state.selectedPlayer}
                onSelectPlayer={id => dispatch({ type: "SELECT_PLAYER", id })}
                viewMode={state.viewMode}
                zoom={state.zoom}
                panX={state.panX}
                panY={state.panY}
                onPan={(dx, dy) => dispatch({ type: "PAN", dx, dy })}
                onZoom={factor => dispatch({ type: "ZOOM", factor })}
                onResetView={() => dispatch({ type: "RESET_VIEW" })}
              />

              <PhaseNav
                scenario={scenario}
                currentPhase={sample.index}
                timeMs={state.timeMs}
                playing={state.playing}
                speed={state.speed}
                onSeek={timeMs => dispatch({ type: "SEEK", scenario, timeMs })}
                onPhaseChange={index => dispatch({ type: "PHASE", scenario, sample, index })}
                onPlayToggle={() => dispatch({ type: state.playing ? "PAUSE" : "PLAY", scenario })}
                onReset={() => dispatch({ type: "RESET" })}
                onSpeed={speed => dispatch({ type: "SPEED", speed })}
              />

              {selected && (
                <aside className="player-detail" aria-label={`Compito del giocatore ${selected.n}`}>
                  <div className="player-detail-heading">
                    <div><span className="player-detail-number" style={{ background: selected.c }}>{selected.n}</span><strong>{ROLES[selected.n] || "Giocatore"}</strong></div>
                    <button type="button" onClick={() => dispatch({ type: "SELECT_PLAYER", id: selected.id })} aria-label="Chiudi dettaglio giocatore">×</button>
                  </div>
                  <p>{detail.action}</p>
                  <p><strong>{detail.supportLabel}:</strong> {detail.support}</p>
                  <small>La linea tratteggiata indica lo spostamento rispetto alla fase precedente.</small>
                </aside>
              )}

              <div className="phase-explanation"><strong>Cosa osservare</strong><p>{phase.desc}</p></div>
              <Legend />
            </>
          )}
        </main>
      )}

      {view === "tattiche" && <main><TattichePage /></main>}
    </div>
  );
}
