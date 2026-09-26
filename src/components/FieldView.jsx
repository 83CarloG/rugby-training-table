import { useEffect, useRef, useState } from "react";
import Field from "./Field";
import Player from "./Player";
import Defender from "./Defender";
import Arrow from "./Arrow";

function viewBoxFor(scenario, sample, mode, zoom, panX, panY, stageWidth, aspect) {
  const { fw, fh } = scenario;
  let width = fw;
  let height = fh;
  if (mode === "focus") {
    height = Math.min(fh, stageWidth < 600 ? 420 : 560);
    width = height * aspect;
    if (width > fw) {
      width = fw;
      height = width / aspect;
    }
  }
  width /= zoom;
  height /= zoom;
  const target = mode === "focus" && sample.ball ? sample.ball : { x: fw / 2, y: fh / 2 };
  const x = Math.max(0, Math.min(fw - width, target.x + panX - width / 2));
  const y = Math.max(0, Math.min(fh - height, target.y + panY - height / 2));
  return { x, y, width, height };
}

export default function FieldView({ scenario, sample, selectedPlayer, onSelectPlayer, viewMode, zoom, panX, panY, onPan, onZoom, onResetView }) {
  const stageRef = useRef(null);
  const pointers = useRef(new Map());
  const dragged = useRef(false);
  const [size, setSize] = useState({ width: 390, height: 470 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      if (rect.height) setSize({ width: rect.width, height: rect.height });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const box = viewBoxFor(scenario, sample, viewMode, zoom, panX, panY, size.width, size.width / size.height);
  const previous = scenario.phases[sample.index - 1];
  const chosen = sample.players.find(player => player.id === selectedPlayer && !player.leaving);
  const from = previous?.players.find(player => player.id === selectedPlayer);
  const target = sample.phase.players.find(player => player.id === selectedPlayer);

  function pointerDown(event) {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    dragged.current = false;
  }

  function pointerMove(event) {
    const old = pointers.current.get(event.pointerId);
    if (!old) return;
    const all = [...pointers.current.entries()];
    const oldDistance = all.length === 2
      ? Math.hypot(all[0][1].x - all[1][1].x, all[0][1].y - all[1][1].y)
      : 0;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const dx = event.clientX - old.x;
    const dy = event.clientY - old.y;
    if (Math.abs(dx) + Math.abs(dy) < 2) return;
    dragged.current = true;
    event.preventDefault();
    const rect = stageRef.current.getBoundingClientRect();
    onPan(-dx * box.width / rect.width, -dy * box.height / rect.height);
    if (all.length === 2 && oldDistance > 0) {
      const points = [...pointers.current.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      onZoom(distance / oldDistance);
    }
  }

  function pointerUp(event) {
    pointers.current.delete(event.pointerId);
    if (dragged.current) window.setTimeout(() => { dragged.current = false; }, 100);
  }

  return (
    <div className="field-shell">
      <div
        className={`field-stage field-stage--${viewMode}`}
        ref={stageRef}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onPointerLeave={pointerUp}
      >
        {sample.phase.callout && <div className="field-callout" style={{ color: sample.phase.calloutC || "#f4d7a5" }}>{sample.phase.callout}</div>}
        <Field w={scenario.fw} h={scenario.fh} gl={sample.gainLine} viewBox={box}>
          {sample.phase.pods?.map((pod, i) => (
            <ellipse key={i} cx={pod.cx} cy={pod.cy} rx={pod.rx} ry={pod.ry} fill="none" stroke={pod.c} strokeWidth={2} strokeDasharray="6 5" opacity={0.8 * sample.lineOpacity} />
          ))}
          {sample.phase.lines?.map((line, i) => (
            <Arrow key={i} from={line.from} to={line.to} c={line.c} lb={line.lb} cv={line.cv || 0} ds={line.ds} thick={line.thick} op={sample.lineOpacity} />
          ))}
          {sample.phase.labels?.map((label, i) => (
            <text key={i} x={label.x} y={label.y} textAnchor="middle" fill={label.c?.startsWith("rgba") ? "#e6f4dc" : label.c} stroke="rgba(0,0,0,.75)" strokeWidth={2} paintOrder="stroke" fontSize={label.s ? 10 : 12} fontWeight={label.s ? 600 : 800} fontFamily="system-ui,sans-serif" opacity={sample.lineOpacity}>{label.t}</text>
          ))}
          {sample.defense.map(defender => <Defender key={defender.id} {...defender} />)}
          {from && target && selectedPlayer != null && (
            <line x1={from.x} y1={from.y} x2={target.x} y2={target.y} stroke="#fff" strokeWidth={3} strokeDasharray="8 7" opacity={0.7} />
          )}
          {sample.players.map(player => (
            <Player
              key={player.id}
              {...player}
              selected={player.id === selectedPlayer}
              dimmed={selectedPlayer != null && player.id !== selectedPlayer}
              onSelect={() => { if (!dragged.current && !player.leaving) onSelectPlayer(player.id); }}
            />
          ))}
          {sample.ball && (
            <g aria-hidden="true" className="ball-marker">
              <ellipse cx={sample.ball.x} cy={sample.ball.y} rx={10} ry={6.5} fill="#f7d38a" stroke="#392618" strokeWidth={1.5} transform={`rotate(-30 ${sample.ball.x} ${sample.ball.y})`} />
              <line x1={sample.ball.x - 3} y1={sample.ball.y - 2} x2={sample.ball.x + 3} y2={sample.ball.y + 2} stroke="#624729" strokeWidth={1} />
            </g>
          )}
        </Field>
      </div>
      <div className="field-tools" aria-label="Controlli campo">
        <button type="button" onClick={() => onZoom(1.25)} aria-label="Ingrandisci campo">＋</button>
        <button type="button" onClick={() => onZoom(0.8)} aria-label="Riduci campo">－</button>
        <button type="button" onClick={onResetView} aria-label="Centra campo">⌖</button>
      </div>
      <div className="field-caption">
        <span>● Palla · tocca un giocatore oppure scegli il suo numero</span>
        <select
          aria-label="Seleziona un giocatore"
          value={selectedPlayer ?? ""}
          onChange={event => onSelectPlayer(event.target.value === "" ? null : Number(event.target.value))}
        >
          <option value="">Giocatore…</option>
          {[...sample.phase.players].sort((a, b) => a.n - b.n).map(player => <option key={player.id} value={player.id}>N° {player.n}</option>)}
        </select>
      </div>
      {chosen && <span className="sr-only" aria-live="polite">Giocatore {chosen.n} selezionato</span>}
    </div>
  );
}
