export default function Field({ w, h, gl, children }) {
  const n = 24, sw = (w - 4) / n;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: 920, display: "block", margin: "0 auto", borderRadius: 8, border: "2px solid rgba(255,255,255,0.07)" }}>
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2d7a3e" /><stop offset="100%" stopColor="#287035" /></linearGradient>
        <linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#276e33" /><stop offset="100%" stopColor="#22642f" /></linearGradient>
      </defs>
      <rect width={w} height={h} fill="#256b34" rx={8} />
      {Array.from({ length: n }).map((_, i) => <rect key={i} x={2 + i * sw} y={2} width={sw} height={h - 4} fill={i % 2 === 0 ? "url(#a)" : "url(#b)"} />)}
      <line x1={3} y1={0} x2={3} y2={h} stroke="white" strokeWidth={2} />
      <line x1={w - 3} y1={0} x2={w - 3} y2={h} stroke="white" strokeWidth={2} />
      <line x1={32} y1={0} x2={32} y2={h} stroke="white" strokeWidth={0.5} strokeDasharray="3 7" opacity={0.18} />
      <line x1={w - 32} y1={0} x2={w - 32} y2={h} stroke="white" strokeWidth={0.5} strokeDasharray="3 7" opacity={0.18} />
      <line x1={88} y1={0} x2={88} y2={h} stroke="white" strokeWidth={0.4} strokeDasharray="3 9" opacity={0.1} />
      <line x1={w - 88} y1={0} x2={w - 88} y2={h} stroke="white" strokeWidth={0.4} strokeDasharray="3 9" opacity={0.1} />
      <line x1={3} y1={h * 0.08} x2={w - 3} y2={h * 0.08} stroke="white" strokeWidth={0.7} opacity={0.1} />
      <line x1={3} y1={h * 0.5} x2={w - 3} y2={h * 0.5} stroke="white" strokeWidth={0.7} strokeDasharray="8 8" opacity={0.06} />
      <line x1={3} y1={h * 0.92} x2={w - 3} y2={h * 0.92} stroke="white" strokeWidth={0.7} opacity={0.1} />
      {gl && <line x1={8} y1={gl} x2={w - 8} y2={gl} stroke="#ef4444" strokeWidth={1.2} strokeDasharray="7 5" opacity={0.18} />}
      <text x={w / 2} y={12} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize={7} fontFamily="'JetBrains Mono',monospace" fontWeight="700">↑ META</text>
      {children}
    </svg>
  );
}
