export default function PhaseNav({ phases, currentPhase, onPhaseChange, auto, onPlayToggle, onReset }) {
  return (
    <nav className="phase-nav">
      <div className="phase-scroll">
        <div className="phase-btns">
          {phases.map((pp, i) => {
            const cur = currentPhase === i, past = i < currentPhase;
            const isR = pp.name.includes("🔴"), isB = pp.name.includes("🔵"), isRl = pp.name.includes("🔁");
            const ac = isR ? "#ef4444" : isB ? "#3b82f6" : isRl ? "#22d3ee" : "#f59e0b";
            return (
              <button
                key={i}
                onClick={() => onPhaseChange(i)}
                className="phase-btn"
                style={{
                  background: cur ? `linear-gradient(135deg,${ac},${ac}dd)` : past ? `${ac}18` : "rgba(255,255,255,0.02)",
                  color: cur ? "#fff" : past ? ac : "rgba(255,255,255,0.25)",
                  boxShadow: cur ? `0 2px 8px ${ac}40` : "none",
                }}
              >
                <span className="phase-num" style={{ background: cur ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.04)" }}>
                  {i + 1}
                </span>
                <span className="phase-label">{pp.name.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <button onClick={onReset} className="ctrl-btn ctrl-reset">⟲ Reset</button>
        <button
          onClick={onPlayToggle}
          className="ctrl-btn"
          style={{
            border: `1px solid ${auto ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.08)"}`,
            background: auto ? "rgba(239,68,68,0.06)" : "rgba(34,197,94,0.05)",
            color: auto ? "#f87171" : "#4ade80",
          }}
        >{auto ? "⏸ Stop" : "▶ Play"}</button>
      </div>
    </nav>
  );
}
