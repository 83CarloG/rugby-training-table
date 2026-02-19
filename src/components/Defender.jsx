export default function Defender({ x, y, hit }) {
  return (
    <g opacity={hit ? 0.35 : 0.45}>
      <circle cx={x} cy={y} r={7} fill={hit ? "#7f1d1d" : "rgba(127,29,29,0.22)"} stroke="rgba(185,28,28,0.3)" strokeWidth={0.8} />
      <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.4)" fontSize={5.5} fontWeight="700" fontFamily="'JetBrains Mono',monospace">D</text>
    </g>
  );
}
