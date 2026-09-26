export default function Field({ w, h, gl, viewBox, children }) {
  const stripes = 20;
  return (
    <svg
      className="field-svg"
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      role="group"
      aria-label="Campo tattico con giocatori, difesa, palla e percorsi"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="grass" width={w / stripes * 2} height={h} patternUnits="userSpaceOnUse">
          <rect width={w / stripes * 2} height={h} fill="#266a39" />
          <rect width={w / stripes} height={h} fill="#2c7540" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#grass)" />
      <rect x={4} y={4} width={w - 8} height={h - 8} fill="none" stroke="rgba(255,255,255,.8)" strokeWidth={3} />
      <line x1={w / 2} y1={0} x2={w / 2} y2={h} stroke="rgba(255,255,255,.2)" strokeDasharray="10 12" strokeWidth={2} />
      <line x1={4} y1={h * .5} x2={w - 4} y2={h * .5} stroke="rgba(255,255,255,.18)" strokeWidth={2} />
      <line x1={4} y1={h * .1} x2={w - 4} y2={h * .1} stroke="rgba(255,255,255,.2)" strokeWidth={2} />
      <line x1={4} y1={h * .9} x2={w - 4} y2={h * .9} stroke="rgba(255,255,255,.2)" strokeWidth={2} />
      {Number.isFinite(gl) && <line x1={8} y1={gl} x2={w - 8} y2={gl} stroke="#f8b663" strokeWidth={3} strokeDasharray="12 8" opacity={0.8} />}
      {children}
    </svg>
  );
}
