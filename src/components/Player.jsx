export default function Player({ x, y, n, c, opacity = 1, selected, dimmed, onSelect }) {
  return (
    <g
      className="player-marker"
      role="button"
      tabIndex={0}
      aria-label={`Giocatore ${n}${selected ? ", selezionato" : ""}`}
      onClick={onSelect}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onSelect();
        }
      }}
      opacity={opacity * (dimmed ? 0.48 : 1)}
    >
      <title>Giocatore {n}</title>
      {selected && <circle cx={x} cy={y} r={25} fill="none" stroke="#fff" strokeWidth={3} />}
      <circle cx={x} cy={y} r={20} fill={c} stroke="rgba(255,255,255,.8)" strokeWidth={1.5} />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fill="#fff" stroke="rgba(0,0,0,.6)" strokeWidth={2} paintOrder="stroke" fontSize={17} fontWeight={800} fontFamily="system-ui,sans-serif">{n}</text>
    </g>
  );
}
