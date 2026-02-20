import { C } from "../constants";

export default {
  title: "🔵 GIOCATA BLU",
  desc: "10 chiama BLU: pod 1-4-8 corre dietro al 10, si posiziona a triangolo oltre lui e attacca compatto.",
  fw: 880, fh: 900,
  phases: [
    { // 1 ─ RUCK VINTA — 10 CHIAMA BLU
      name: "1. Ruck vinta — 10 chiama BLU",
      obj: "Ruck vinta: 1-4-8 sparpagliati, il 10 a destra chiama BLU",
      desc: "La ruck è vinta da 2-5-7. Il 9 ha la palla. Il pod 1-4-8 è sparpagliato dietro la ruck. Il 10, a destra, chiama BLU: il pod correrà dietro di lui, si posizionerà a triangolo oltre il 10 e creerà superiorità numerica al centro.",
      callout: "BLU",
      calloutC: C.pod2,
      players: [
        { id: 2, n: 2, x: 354, y: 616, c: C.pod1 },
        { id: 5, n: 5, x: 372, y: 612, c: C.pod1 },
        { id: 7, n: 7, x: 390, y: 618, c: C.pod1 },
        { id: 9, n: 9, x: 330, y: 636, c: C.med  },
        { id: 1, n: 1, x: 432, y: 650, c: C.pod2 },
        { id: 4, n: 4, x: 412, y: 660, c: C.pod2 },
        { id: 8, n: 8, x: 454, y: 644, c: C.pod2 },
        { id: 10, n: 10, x: 568, y: 666, c: C.backs },
      ],
      defense: [
        { x: 750, y: 562 }, { x: 672, y: 562 }, { x: 594, y: 562 },
        { x: 516, y: 562 }, { x: 438, y: 562 }, { x: 360, y: 562 },
        { x: 282, y: 562 }, { x: 204, y: 562 }, { x: 126, y: 562 },
      ],
      lines: [],
      labels: [
        { t: "RUCK — 2-5-7",       x: 372, y: 600, c: C.pod1 },
        { t: "1-4-8 sparpagliati", x: 434, y: 76, c: C.pod2 },
        { t: "← BLU",              x: 568, y: 652, c: C.backs },
      ],
      pods: [{ cx: 372, cy: 615, rx: 28, ry: 14, c: C.pod1 }],
      gl: 524,
    },

    { // 2 ─ 1-4-8 CORRONO DIETRO AL 10
      name: "2. 1-4-8 corrono dietro al 10",
      obj: "Il pod passa dietro al 10 per raggiungerlo e superarlo",
      desc: "Il pod 1-4-8 parte veloce e corre dietro al 10, passandogli alle spalle. I tre lo aggirano in corsa, compatti. Il 9 tiene la palla in attesa. La difesa è costretta a scegliere: seguire il pod o tenere il 10.",
      callout: "BLU",
      calloutC: C.pod2,
      players: [
        { id: 2, n: 2, x: 354, y: 614, c: C.dim  },
        { id: 5, n: 5, x: 372, y: 610, c: C.dim  },
        { id: 7, n: 7, x: 390, y: 616, c: C.dim  },
        { id: 9, n: 9, x: 334, y: 630, c: C.med  },
        { id: 1, n: 1, x: 444, y: 668, c: C.pod2 },
        { id: 4, n: 4, x: 424, y: 678, c: C.pod2 },
        { id: 8, n: 8, x: 466, y: 662, c: C.pod2 },
        { id: 10, n: 10, x: 568, y: 648, c: C.backs },
      ],
      defense: [
        { x: 750, y: 540 }, { x: 672, y: 540 }, { x: 594, y: 540 },
        { x: 516, y: 540 }, { x: 438, y: 540 }, { x: 360, y: 540 },
        { x: 282, y: 540 }, { x: 204, y: 540 }, { x: 126, y: 540 },
      ],
      // frecce curve che passano DIETRO (sotto) il 10 verso le posizioni del triangolo
      lines: [
        { from: [444, 668], to: [616, 642], c: C.pod2, cv: 46, thick: true },
        { from: [424, 678], to: [632, 628], c: C.pod2, cv: 52, thick: true },
        { from: [466, 662], to: [652, 640], c: C.pod2, cv: 44, thick: true },
      ],
      labels: [
        { t: "dietro al 10 →", x: 496, y: 694, c: C.pod2 },
      ],
      pods: [],
      gl: 502,
    },

    { // 3 ─ TRIANGOLO OLTRE IL 10 — 9 PASSA AL 10
      name: "3. Triangolo oltre il 10 — 9 passa al 10",
      obj: "Pod a triangolo oltre il 10, profondi — superiorità numerica creata",
      desc: "Il pod si è posizionato a triangolo oltre il 10, con profondità per prendere velocità. Il 9 passa al 10. La difesa è in inferiorità numerica: il 10 riceve con il triangolo già schierato davanti e scarica.",
      callout: "BLU",
      calloutC: C.pod2,
      players: [
        { id: 2, n: 2, x: 354, y: 610, c: C.dim  },
        { id: 5, n: 5, x: 372, y: 606, c: C.dim  },
        { id: 7, n: 7, x: 390, y: 612, c: C.dim  },
        { id: 9, n: 9, x: 322, y: 624, c: C.med  },
        { id: 4, n: 4, x: 732, y: 676, c: C.pod2 },  // punta del triangolo
        { id: 1, n: 1, x: 714, y: 694, c: C.pod2 },  // dietro-sinistra
        { id: 8, n: 8, x: 752, y: 692, c: C.pod2 },  // dietro-destra
        { id: 10, n: 10, x: 568, y: 636, c: C.backs },
      ],
      defense: [
        { x: 750, y: 518 }, { x: 672, y: 518 }, { x: 594, y: 518 },
        { x: 516, y: 518 }, { x: 438, y: 518 }, { x: 360, y: 518 },
        { x: 282, y: 518 }, { x: 204, y: 518 }, { x: 126, y: 518 },
      ],
      lines: [
        { from: [330, 622], to: [558, 634], c: C.med,   lb: "9 → 10"           },
        { from: [576, 632], to: [624, 628], c: C.backs, lb: "→",  thick: true  },
      ],
      labels: [
        { t: "TRIANGOLO",  x: 734, y: 642, c: C.pod2 },
      ],
      pods: [{ cx: 634, cy: 637, rx: 28, ry: 22, c: C.pod2 }],
      gl: 480,
    },

    { // 4 ─ 10 SCARICA — PUNTO D'INCONTRO
      name: "4. 10 scarica — mini-unit punto d'incontro",
      obj: "10 scarica sulla mini-unit: 1-4-8 arriva veloce e compatta — punto d'incontro!",
      desc: "Il 10 scarica sulla mini-unit 1-4-8 che arriva già veloce e compatta. I tre avanzano come blocco, sfruttando la superiorità numerica. Il punto d'incontro è garantito: la difesa non può coprire in tempo.",
      callout: "BLU",
      calloutC: C.pod2,
      players: [
        { id: 2, n: 2, x: 354, y: 606, c: C.dim  },
        { id: 5, n: 5, x: 372, y: 602, c: C.dim  },
        { id: 7, n: 7, x: 390, y: 608, c: C.dim  },
        { id: 9, n: 9, x: 320, y: 618, c: C.med  },
        { id: 4, n: 4, x: 730, y: 540, c: C.pod2 },
        { id: 1, n: 1, x: 712, y: 550, c: C.pod2 },
        { id: 8, n: 8, x: 750, y: 546, c: C.pod2 },
        { id: 10, n: 10, x: 568, y: 622, c: C.backs },
      ],
      defense: [
        { x: 750, y: 498 }, { x: 672, y: 498 }, { x: 594, y: 498, hit: true },
        { x: 516, y: 498 }, { x: 438, y: 498 }, { x: 360, y: 498 },
        { x: 282, y: 498 }, { x: 204, y: 498 }, { x: 126, y: 498 },
      ],
      lines: [
        { from: [728, 608], to: [724, 570], c: C.pod2,  lb: "CARRY!",    thick: true },
      ],
      labels: [
        { t: "PUNTO D'INCONTRO", x: 750, y: 506, c: C.pod2 },
      ],
      pods: [{ cx: 630, cy: 545, rx: 28, ry: 16, c: C.pod2 }],
      gl: 460,
    },
  ],
};
