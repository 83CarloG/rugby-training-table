import { C } from "../constants";

export default {
  title: "🔴 GIOCATA ROSSA",
  desc: "8 e 12 si alternano: 3 ruck consecutive da destra verso sinistra.",
  fw: 880, fh: 900,
  phases: [
    { // 1 ─ 1ª RUCK (DESTRA)
      name: "1. 1ª Ruck — Destra",
      obj: "8 riceve dal 9 e carica dentro",
      desc: "Il 9 serve corto l'8. L'8 carica basso e potente sulla destra. Il 12 rimane largo a sinistra pronto per la prossima chiamata ROSSO.",
      callout: "ROSSO",
      players: [
        { id: 9,  n: 9,  x: 736, y: 648, c: C.med   },
        { id: 8,  n: 8,  x: 708, y: 604, c: C.pod1  },
        { id: 12, n: 12, x: 590, y: 662, c: C.centro },
      ],
      defense: [
        { x: 752, y: 560 }, { x: 708, y: 562, hit: true }, { x: 656, y: 560 },
        { x: 596, y: 560 }, { x: 528, y: 560 }, { x: 456, y: 560 },
        { x: 370, y: 560 }, { x: 288, y: 560 }, { x: 200, y: 560 },
      ],
      lines: [
        { from: [732, 650], to: [710, 626], c: C.med,  lb: "9→8" },
        { from: [708, 606], to: [708, 570], c: C.pod1, lb: "CARRY!", thick: true },
      ],
      labels: [],
      gl: 522,
    },
    { // 2 ─ 2ª RUCK (CENTRO)
      name: "2. 2ª Ruck — Centro",
      obj: "9 serve il 12 che carica al centro",
      desc: "L'8 è a terra (ruck 1). Il 9 porta subito la palla al 12 che carica al centro della difesa. L'8 si rialza e scatta a sinistra per il prossimo carry.",
      callout: "ROSSO",
      players: [
        { id: 8,  n: 8,  x: 710, y: 582, c: C.dim    },
        { id: 9,  n: 9,  x: 694, y: 598, c: C.med    },
        { id: 12, n: 12, x: 502, y: 556, c: C.centro },
      ],
      defense: [
        { x: 748, y: 522 }, { x: 680, y: 522 }, { x: 600, y: 522 },
        { x: 502, y: 524, hit: true }, { x: 428, y: 522 }, { x: 354, y: 522 },
        { x: 270, y: 522 }, { x: 186, y: 522 }, { x: 102, y: 522 },
      ],
      lines: [
        { from: [690, 600], to: [506, 568], c: C.med,    lb: "9→12" },
        { from: [502, 558], to: [502, 524], c: C.centro, lb: "CARRY!", thick: true },
      ],
      labels: [],
      gl: 490,
    },
    { // 3 ─ 3ª RUCK (SINISTRA)
      name: "3. 3ª Ruck — Sinistra",
      obj: "8 scatta a sinistra e riceve dal 9 — terzo carry",
      desc: "Il 12 è a terra (ruck 2). L'8 è scattato a sinistra dopo la prima ruck. Il 9 serve corto l'8 che carica potente sul lato sinistro. La difesa è stata spostata a destra dai due carry precedenti.",
      callout: "ROSSO",
      players: [
        { id: 12, n: 12, x: 504, y: 542, c: C.dim   },
        { id: 9,  n: 9,  x: 486, y: 558, c: C.med   },
        { id: 8,  n: 8,  x: 304, y: 516, c: C.pod1  },
      ],
      defense: [
        { x: 742, y: 484 }, { x: 650, y: 484 }, { x: 558, y: 484 },
        { x: 466, y: 484 }, { x: 374, y: 484 }, { x: 304, y: 486, hit: true },
        { x: 232, y: 484 }, { x: 150, y: 484 }, { x: 68,  y: 484 },
      ],
      lines: [
        { from: [482, 560], to: [308, 528], c: C.med,  lb: "9→8" },
        { from: [304, 518], to: [304, 486], c: C.pod1, lb: "CARRY!", thick: true },
      ],
      labels: [],
      gl: 458,
    },
  ],
};
