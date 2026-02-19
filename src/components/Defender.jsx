export default function Defender({ x, y, hit }) {
  return (
    <g opacity={hit ? 0.45 : 0.55}>
      <circle cx={x} cy={y} r={15} fill={hit ? "#7f1d1d" : "rgba(127,29,29,0.28)"} stroke="rgba(185,28,28,0.4)" strokeWidth={1.2} />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.5)" fontSize={11} fontWeight="700" fontFamily="'JetBrains Mono',monospace">D</text>
    </g>
  );
}
