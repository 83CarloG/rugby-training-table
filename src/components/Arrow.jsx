export default function Arrow({ from, to, c, lb, cv = 0, ds, thick, op = 1 }) {
  const mx = (from[0] + to[0]) / 2, my = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0], dy = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 4) return null;
  const nx = -dy / len, ny = dx / len;
  const qx = mx + nx * cv, qy = my + ny * cv;
  const t2 = 0.97;
  const bx = (1 - t2) ** 2 * from[0] + 2 * (1 - t2) * t2 * qx + t2 ** 2 * to[0];
  const by = (1 - t2) ** 2 * from[1] + 2 * (1 - t2) * t2 * qy + t2 ** 2 * to[1];
  const adx = to[0] - bx, ady = to[1] - by;
  const al = Math.sqrt(adx * adx + ady * ady) || 1;
  const anx = adx / al, any = ady / al;
  const lx = mx + nx * cv * 0.5, ly = my + ny * cv * 0.5 - 8;
  return (
    <g opacity={op}>
      <path d={`M${from[0]},${from[1]} Q${qx},${qy} ${to[0]},${to[1]}`} fill="none" stroke={c} strokeWidth={thick ? 2.5 : 1.5} strokeDasharray={ds ? "4 4" : "none"} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${to[0] - anx * 6 - any * 3},${to[1] - any * 6 + anx * 3} ${to[0] - anx * 6 + any * 3},${to[1] - any * 6 - anx * 3}`} fill={c} />
      {lb && (<>
        <text x={lx} y={ly} textAnchor="middle" fill="#000" fontSize={6.5} fontWeight="700" fontFamily="'JetBrains Mono',monospace" stroke="rgba(0,0,0,0.7)" strokeWidth={2.5} paintOrder="stroke">{lb}</text>
        <text x={lx} y={ly} textAnchor="middle" fill={c} fontSize={6.5} fontWeight="700" fontFamily="'JetBrains Mono',monospace">{lb}</text>
      </>)}
    </g>
  );
}
