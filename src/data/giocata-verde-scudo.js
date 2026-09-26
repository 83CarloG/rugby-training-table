import { C } from "../constants.js";

const VRD = "#22c55e"; // verde callout

export default {
  title: "🟢 GIOCATA VERDE — SCUDO",
  desc: "9 chiama VERDE SCUDO: gli avanti liberi salgono davanti ai back come schermo, i back attaccano ampi.",
  fw: 880, fh: 900,
  phases: [
    { // 1 ─ PUNTO D'INCONTRO — 9 CHIAMA VERDE
      name: "1. Punto d'incontro — 9 chiama VERDE",
      obj: "Ruck vinta: back schierati ampi, 6 e 3 pronti allo scudo",
      desc: "Punto d'incontro vinto. Il 9 ha la palla. I back 10-12-13-14 sono schierati ampi a destra. Gli avanti liberi 6 e 3 sono vicino alla ruck: alla chiamata VERDE saliranno davanti alla linea dei back come scudo per obbligare la difesa a scegliere.",
      callout: "VERDE",
      calloutC: VRD,
      players: [
        { id: 1, n: 1, x: 344, y: 618, c: C.ruck   },
        { id: 4, n: 4, x: 362, y: 614, c: C.ruck   },
        { id: 8, n: 8, x: 380, y: 620, c: C.ruck   },
        { id: 9, n: 9, x: 320, y: 638, c: C.med    },
        { id: 6, n: 6, x: 420, y: 650, c: C.onda   },
        { id: 3, n: 3, x: 442, y: 640, c: C.onda   },
        { id: 10, n: 10, x: 500, y: 664, c: C.backs  },
        { id: 12, n: 12, x: 610, y: 668, c: C.centro },
        { id: 13, n: 13, x: 700, y: 664, c: C.centro },
        { id: 14, n: 14, x: 774, y: 660, c: C.larghi },
      ],
      defense: [
        { x: 750, y: 562 }, { x: 672, y: 562 }, { x: 594, y: 562 },
        { x: 516, y: 562 }, { x: 438, y: 562 }, { x: 360, y: 562 },
        { x: 282, y: 562 }, { x: 204, y: 562 }, { x: 126, y: 562 },
      ],
      lines: [],
      labels: [
        { t: "RUCK",          x: 362, y: 602, c: C.ruck   },
        { t: "6-3 → SCUDO",  x: 431, y: 634, c: C.onda   },
        { t: "back ampi →",  x: 637, y: 650, c: C.backs  },
      ],
      pods: [{ cx: 362, cy: 617, rx: 28, ry: 14, c: C.ruck }],
      gl: 524,
    },

    { // 2 ─ AVANTI SALGONO DAVANTI AI BACK — SCUDO FORMATO
      name: "2. 6 e 3 salgono come scudo — 9 → 10",
      obj: "6 e 3 si proiettano davanti ai back: la difesa deve scegliere",
      desc: "Gli avanti liberi 6 e 3 salgono veloce davanti alla linea dei back, inserendosi tra i difensori e i trequarti. Il 9 lancia al 10. La difesa è in difficoltà: se segue lo scudo lascia spazio ai back, se ignora lo scudo gli avanti sfondano.",
      callout: "VERDE",
      calloutC: VRD,
      players: [
        { id: 1, n: 1, x: 344, y: 616, c: C.dim    },
        { id: 4, n: 4, x: 362, y: 612, c: C.dim    },
        { id: 8, n: 8, x: 380, y: 618, c: C.dim    },
        { id: 9, n: 9, x: 322, y: 630, c: C.med    },
        { id: 6, n: 6, x: 608, y: 608, c: C.onda   },  // davanti al 12 (12 a y=650)
        { id: 3, n: 3, x: 698, y: 604, c: C.onda   },  // davanti al 13 (13 a y=646)
        { id: 10, n: 10, x: 500, y: 646, c: C.backs  },
        { id: 12, n: 12, x: 610, y: 650, c: C.centro },
        { id: 13, n: 13, x: 700, y: 646, c: C.centro },
        { id: 14, n: 14, x: 774, y: 642, c: C.larghi },
      ],
      defense: [
        { x: 750, y: 540 }, { x: 672, y: 540 }, { x: 594, y: 540 },
        { x: 516, y: 540 }, { x: 438, y: 540 }, { x: 360, y: 540 },
        { x: 282, y: 540 }, { x: 204, y: 540 }, { x: 126, y: 540 },
      ],
      lines: [
        { from: [326, 628], to: [492, 644], c: C.med,  lb: "9 → 10"         },
        { from: [608, 608], to: [608, 544], c: C.onda, lb: "6 →",  thick: true },
        { from: [698, 604], to: [698, 540], c: C.onda, lb: "3 →",  thick: true },
      ],
      labels: [
        { t: "SCUDO DAVANTI", x: 653, y: 592, c: C.onda },
      ],
      pods: [],
      gl: 502,
    },

    { // 3 ─ BACK AMPI DIETRO LO SCUDO — OVERLAP
      name: "3. Back ampi dietro lo scudo — OVERLAP!",
      obj: "Back corrono liberi dietro lo scudo — superiorità numerica!",
      desc: "Il 10 lancia ampio. I back 12-13-14 corrono dietro le linee di sostegno di 6 e 3. Il 14 cerca spazio esterno in base alla scelta della difesa.",
      callout: "VERDE",
      calloutC: VRD,
      players: [
        { id: 1, n: 1, x: 344, y: 612, c: C.dim    },
        { id: 4, n: 4, x: 362, y: 608, c: C.dim    },
        { id: 8, n: 8, x: 380, y: 614, c: C.dim    },
        { id: 9, n: 9, x: 320, y: 622, c: C.med    },
        { id: 6, n: 6, x: 608, y: 528, c: C.onda   },  // scudo avanzato vicino difesa
        { id: 3, n: 3, x: 698, y: 524, c: C.onda   },
        { id: 10, n: 10, x: 500, y: 566, c: C.backs  },
        { id: 12, n: 12, x: 610, y: 570, c: C.centro },
        { id: 13, n: 13, x: 700, y: 566, c: C.centro },
        { id: 14, n: 14, x: 774, y: 562, c: C.larghi },
      ],
      defense: [
        { x: 750, y: 518 }, { x: 672, y: 518 }, { x: 594, y: 518, hit: true },
        { x: 516, y: 518 }, { x: 438, y: 518 }, { x: 360, y: 518 },
        { x: 282, y: 518 }, { x: 204, y: 518 }, { x: 126, y: 518 },
      ],
      lines: [
        { from: [506, 564], to: [602, 568], c: C.backs,  lb: "→ 12",  thick: true },
        { from: [617, 568], to: [692, 564], c: C.centro, lb: "→ 13",  thick: true },
        { from: [707, 564], to: [766, 560], c: C.larghi, lb: "→ 14!", thick: true },
      ],
      labels: [
        { t: "OVERLAP!", x: 774, y: 546, c: C.larghi },
      ],
      pods: [],
      gl: 480,
    },
  ],
};
