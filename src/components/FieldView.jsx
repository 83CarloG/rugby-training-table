import { useState, useEffect, useRef } from "react";
import Field from "./Field";
import Player from "./Player";
import Defender from "./Defender";
import Arrow from "./Arrow";
import { lerp, ease } from "../utils";

export default function FieldView({ idx, scenario }) {
  const ph = scenario.phases[idx];
  const prev = idx > 0 ? scenario.phases[idx - 1] : null;
  const [t, setT] = useState(1);
  const raf = useRef(null);

  useEffect(() => {
    if (!prev) { setT(1); return; }
    setT(0);
    let st = null;
    const tick = ts => {
      if (!st) st = ts;
      const r = Math.min((ts - st) / 1200, 1);
      setT(ease(r));
      if (r < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [idx]);

  const pm = {};
  if (prev) prev.players.forEach(p => { pm[p.id] = p; });

  const players = ph.players.map(p => {
    const pv = pm[p.id];
    if (!pv || t >= 1) return p;
    return { ...p, x: lerp(pv.x, p.x, t), y: lerp(pv.y, p.y, t) };
  });

  const ghosts = [];
  if (prev && t >= 0.4) {
    ph.players.forEach(p => {
      const pv = pm[p.id];
      if (pv && (Math.abs(pv.x - p.x) > 18 || Math.abs(pv.y - p.y) > 18)) {
        ghosts.push({ ...pv, c: p.c });
      }
    });
  }

  const showA = t > 0.55;

  return (
    <Field w={scenario.fw} h={scenario.fh} gl={ph.gl}>
      {ph.callout && (
        <>
          <rect x={0} y={0} width={scenario.fw} height={82} fill="rgba(0,0,0,0.22)" />
          <text x={scenario.fw / 2} y={62} textAnchor="middle" fill={ph.calloutC || "#ef4444"} fontSize={86} fontWeight="900" fontFamily="'JetBrains Mono',monospace" opacity={0.92} letterSpacing={10}>{ph.callout}</text>
        </>
      )}
      {ph.pods?.map((p, i) => (
        <ellipse key={`p${i}`} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="none" stroke={p.c} strokeWidth={0.8} strokeDasharray="4 3" opacity={0.18} />
      ))}
      {ph.labels?.map((l, i) => (
        <text key={`l${i}`} x={l.x} y={l.y} textAnchor="middle" fill={l.c} fontSize={l.s ? 6 : 7.5} fontWeight={l.s ? "500" : "700"} fontFamily="'JetBrains Mono',monospace">{l.t}</text>
      ))}
      {showA && ph.lines?.map((l, i) => (
        <Arrow key={`a${i}`} from={l.from} to={l.to} c={l.c} lb={l.lb} cv={l.cv || 0} ds={l.ds} thick={l.thick} op={Math.min(1, (t - 0.55) / 0.4)} />
      ))}
      {ph.defense?.map((d, i) => (
        <Defender key={`d${i}`} x={d.x} y={d.y} hit={d.hit} />
      ))}
      {ghosts.map((g, i) => (
        <Player key={`g${i}`} x={g.x} y={g.y} n={g.n} c={g.c} ghost />
      ))}
      {prev && t >= 0.3 && ph.players.map(p => {
        const pv = pm[p.id];
        if (!pv || (Math.abs(pv.x - p.x) < 12 && Math.abs(pv.y - p.y) < 12)) return null;
        return <line key={`t${p.id}`} x1={pv.x} y1={pv.y} x2={p.x} y2={p.y} stroke={p.c} strokeWidth={0.6} strokeDasharray="2 3" opacity={0.08} />;
      })}
      {players.map(p => (
        <Player key={p.id} x={p.x} y={p.y} n={p.n} c={p.c} />
      ))}
    </Field>
  );
}
