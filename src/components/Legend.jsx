import { C } from "../constants";

const ITEMS = [
  { c: C.mischia, l: "Avanti" },
  { c: C.pod1, l: "🔴 Pod 1" },
  { c: C.pod2, l: "🔵 Pod 2" },
  { c: C.onda, l: "🌊 Onda (7+1)" },
  { c: C.ruck, l: "Ruck" },
  { c: C.med, l: "9" },
  { c: C.backs, l: "10" },
  { c: C.centro, l: "12-13" },
];

export default function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">Legenda</div>
      <div className="legend-items">
        {ITEMS.map((item, i) => (
          <div key={i} className="legend-item">
            <div className="legend-dot" style={{ background: item.c }} />
            <span className="legend-text">{item.l}</span>
          </div>
        ))}
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "rgba(127,29,29,0.35)", border: "1px solid rgba(185,28,28,0.25)" }} />
          <span className="legend-text">Difesa</span>
        </div>
      </div>
    </div>
  );
}
