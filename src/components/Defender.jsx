export default function Defender({ x, y, hit, opacity = 1 }) {
  return (
    <g opacity={opacity} aria-hidden="true">
      <circle cx={x} cy={y} r={17} fill={hit ? "#9e3434" : "#653635"} stroke="rgba(255,255,255,.5)" strokeWidth={1.5} />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={13} fontWeight={700} fontFamily="system-ui,sans-serif">D</text>
    </g>
  );
}
