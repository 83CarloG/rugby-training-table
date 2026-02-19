export default function Player({ x, y, n, c, ghost }) {
  if (ghost) return (
    <g opacity={0.15}>
      <circle cx={x} cy={y} r={16} fill="none" stroke={c} strokeWidth={1.5} strokeDasharray="3 3" />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill={c} fontSize={13} fontWeight="700" fontFamily="'JetBrains Mono',monospace">{n}</text>
    </g>
  );
  return (
    <g>
      <circle cx={x} cy={y} r={19} fill="rgba(0,0,0,0.25)" />
      <circle cx={x} cy={y} r={18} fill={c} stroke="rgba(255,255,255,0.2)" strokeWidth={1.2} />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={14} fontWeight="800" fontFamily="'JetBrains Mono',monospace">{n}</text>
    </g>
  );
}
