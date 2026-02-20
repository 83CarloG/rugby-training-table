import { C } from "../constants";

const VRD = "#22c55e"; // verde callout

export default {
  title: "🟢 GIOCATA VERDE — ONDATA",
  desc: "9 chiama VERDE ONDATA: back attaccano ampi, gli avanti liberi seguono in ondata dietro pronti al supporto.",
  fw: 880, fh: 900,
  phases: [
    { // 1 ─ PUNTO D'INCONTRO — 9 CHIAMA VERDE
      name: "1. Punto d'incontro — 9 chiama VERDE",
      obj: "Ruck vinta: back schierati ampi, 6 e 3 pronti all'ondata",
      desc: "Stessa situazione di partenza della variante SCUDO. Il 9 ha la palla. I back 10-12-13-14 sono schierati ampi a destra. Gli avanti liberi 6 e 3 seguiranno dietro ai back come un'ondata, pronti a formare il pod o supportare chiunque faccia contatto.",
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
        { t: "RUCK",           x: 362, y: 602, c: C.ruck   },
        { t: "6-3 → ONDATA",  x: 431, y: 634, c: C.onda   },
        { t: "back ampi →",   x: 637, y: 650, c: C.backs  },
      ],
      pods: [{ cx: 362, cy: 617, rx: 28, ry: 14, c: C.ruck }],
      gl: 524,
    },

    { // 2 ─ 9→10, BACK CORRONO AMPI, AVANTI IN ONDATA DIETRO
      name: "2. 9 → 10 — back ampi — avanti in ondata dietro",
      obj: "Back attaccano ampi, 6 e 3 seguono in ondata dietro di loro",
      desc: "Il 9 lancia al 10. I back si aprono ampi verso destra. Gli avanti liberi 6 e 3 non vanno davanti — seguono DIETRO come un'ondata. Se un back viene fermato, l'ondata arriva immediata: ruck sicura e continuità garantita.",
      callout: "VERDE",
      calloutC: VRD,
      players: [
        { id: 1, n: 1, x: 344, y: 616, c: C.dim    },
        { id: 4, n: 4, x: 362, y: 612, c: C.dim    },
        { id: 8, n: 8, x: 380, y: 618, c: C.dim    },
        { id: 9, n: 9, x: 322, y: 630, c: C.med    },
        { id: 6, n: 6, x: 506, y: 682, c: C.onda   },  // DIETRO al 10 (10 a y=646)
        { id: 3, n: 3, x: 618, y: 686, c: C.onda   },  // DIETRO al 12 (12 a y=650)
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
        { from: [326, 628], to: [492, 644], c: C.med,    lb: "9 → 10"           },
        { from: [506, 644], to: [602, 648], c: C.backs,  lb: "→ 12",  thick: true },
        { from: [420, 648], to: [498, 682], c: C.onda,   lb: "6 ↓",   thick: true },
        { from: [442, 638], to: [610, 686], c: C.onda,   lb: "3 →",   thick: true },
      ],
      labels: [
        { t: "← ondata dietro", x: 560, y: 700, c: C.onda },
      ],
      pods: [],
      gl: 502,
    },

    { // 3 ─ 13 PORTA — ONDATA DI AVANTI A SUPPORTO
      name: "3. 13 porta — ondata a supporto",
      obj: "13 porta palla — l'ondata di avanti arriva immediata a supporto",
      desc: "Il 13 riceve da 12 e porta palla verso la difesa. L'ondata di avanti (6 e 3) è arrivata da dietro in supporto diretto: sicurano la ruck, ripartono veloci. Il 14 è libero fuori se il 13 offloads.",
      callout: "VERDE",
      calloutC: VRD,
      players: [
        { id: 1, n: 1, x: 344, y: 612, c: C.dim    },
        { id: 4, n: 4, x: 362, y: 608, c: C.dim    },
        { id: 8, n: 8, x: 380, y: 614, c: C.dim    },
        { id: 9, n: 9, x: 320, y: 622, c: C.med    },
        { id: 6, n: 6, x: 700, y: 558, c: C.onda   },  // arrivato dietro il 13
        { id: 3, n: 3, x: 616, y: 562, c: C.onda   },  // arrivato a supporto
        { id: 10, n: 10, x: 500, y: 566, c: C.backs  },
        { id: 12, n: 12, x: 610, y: 566, c: C.centro },
        { id: 13, n: 13, x: 698, y: 536, c: C.centro }, // porta palla — contatto!
        { id: 14, n: 14, x: 774, y: 562, c: C.larghi },
      ],
      defense: [
        { x: 750, y: 518 }, { x: 672, y: 518, hit: true }, { x: 594, y: 518 },
        { x: 516, y: 518 }, { x: 438, y: 518 }, { x: 360, y: 518 },
        { x: 282, y: 518 }, { x: 204, y: 518 }, { x: 126, y: 518 },
      ],
      lines: [
        { from: [617, 564], to: [692, 538], c: C.centro, lb: "→ 13",     thick: true },
        { from: [698, 536], to: [696, 520], c: C.centro, lb: "CARRY!",   thick: true },
        { from: [700, 556], to: [698, 538], c: C.onda,   lb: "6 →",      thick: true },
      ],
      labels: [
        { t: "ONDATA",    x: 656, y: 548, c: C.onda   },
        { t: "14 libero", x: 774, y: 548, c: C.larghi },
      ],
      pods: [],
      gl: 480,
    },
  ],
};
