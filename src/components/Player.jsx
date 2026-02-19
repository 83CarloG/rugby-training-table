export default function Player({ x, y, n, c, ghost }) {
  if (ghost) return (
    <g opacity={0.12}>
      <circle cx={x} cy={y} r={7} fill="none" stroke={c} strokeWidth={1} strokeDasharray="2 2" />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill={c} fontSize={7} fontWeight="700" fontFamily="'JetBrains Mono',monospace">{n}</text>
    </g>
  );
  return (
    <g>
      <circle cx={x} cy={y} r={9.5} fill="rgba(0,0,0,0.2)" />
      <circle cx={x} cy={y} r={9} fill={c} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={7.5} fontWeight="800" fontFamily="'JetBrains Mono',monospace">{n}</text>
    </g>
  );
}
