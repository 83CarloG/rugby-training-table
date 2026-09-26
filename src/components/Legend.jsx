import { C } from "../constants.js";

const items = [
  [C.mischia, "Avanti"], [C.pod1, "Pod rosso"], [C.pod2, "Pod blu"],
  [C.ruck, "Ruck"], [C.med, "Mediano"], [C.backs, "Apertura"],
  [C.centro, "Centri"], [C.onda, "Sostegno"], ["#653635", "Difesa"],
];

export default function Legend() {
  return (
    <details className="legend">
      <summary>Legenda del campo</summary>
      <div className="legend-items">
        {items.map(([color, label]) => <span className="legend-item" key={label}><i style={{ background: color }} />{label}</span>)}
        <span className="legend-item"><i className="legend-ball" />Palla</span>
        <span className="legend-item"><i className="legend-gain" />Linea del vantaggio</span>
      </div>
    </details>
  );
}
