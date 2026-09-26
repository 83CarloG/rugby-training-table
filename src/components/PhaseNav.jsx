import { useEffect, useRef } from "react";
import { SPEEDS } from "../timeline.js";

function clock(ms) {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function PhaseNav({ scenario, currentPhase, timeMs, playing, speed, onSeek, onPhaseChange, onPlayToggle, onReset, onSpeed }) {
  const ended = timeMs >= scenario.totalDuration;
  const phaseScroll = useRef(null);
  useEffect(() => {
    const container = phaseScroll.current;
    const active = container?.querySelector('[aria-current="step"]');
    if (!container || !active) return;
    const offset = active.offsetLeft - container.offsetLeft;
    container.scrollLeft = Math.max(0, offset - (container.clientWidth - active.clientWidth) / 2);
  }, [currentPhase, scenario]);
  return (
    <nav className="phase-nav" aria-label="Navigazione della giocata">
      <div className="phase-nav-top">
        <span>Fase {currentPhase + 1} di {scenario.phases.length}</span>
        <span>{clock(timeMs)} / {clock(scenario.totalDuration)}</span>
      </div>
      <input
        className="timeline-range"
        type="range"
        min="0"
        max={scenario.totalDuration}
        step="20"
        value={timeMs}
        aria-label="Posizione nella giocata"
        onChange={event => onSeek(Number(event.target.value))}
        style={{ "--progress": `${timeMs / scenario.totalDuration * 100}%` }}
      />
      <div className="phase-scroll" ref={phaseScroll}>
        <div className="phase-btns">
          {scenario.phases.map((phase, index) => (
            <button
              type="button"
              key={phase.id}
              className={`phase-chip ${index === currentPhase ? "phase-chip--active" : ""}`}
              aria-current={index === currentPhase ? "step" : undefined}
              onClick={() => onPhaseChange(index)}
            >
              <span>{index + 1}</span>
              <small>{phase.name.replace(/^\d+\.\s*/, "")}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="play-controls">
        <button type="button" className="icon-control" onClick={() => onPhaseChange(Math.max(0, currentPhase - 1))} disabled={currentPhase === 0} aria-label="Fase precedente">←</button>
        <button type="button" className="play-control" onClick={onPlayToggle} aria-label={playing ? "Metti in pausa" : ended ? "Rivedi la giocata" : "Riproduci"}>
          {playing ? "Ⅱ Pausa" : ended ? "↻ Rivedi" : "▶ Riproduci"}
        </button>
        <button type="button" className="icon-control" onClick={() => onPhaseChange(Math.min(scenario.phases.length - 1, currentPhase + 1))} disabled={currentPhase === scenario.phases.length - 1} aria-label="Fase successiva">→</button>
        <select className="speed-control" value={speed} onChange={event => onSpeed(Number(event.target.value))} aria-label="Velocità di riproduzione">
          {SPEEDS.map(value => <option key={value} value={value}>{String(value).replace(".", ",")}×</option>)}
        </select>
        <button type="button" className="icon-control reset-control" onClick={onReset} aria-label="Ricomincia dall'inizio">↺</button>
      </div>
    </nav>
  );
}
