import { C } from "../constants";

export default {
  title: "🔴 GIOCATA ROSSA",
  desc: "Ruck 1-4-8 → 9 serve 2-5-7 → mini unit avanza e fa ruck.",
  fw: 880, fh: 900,
  phases: [
    { // 1 ─ RUCK 1 FORMATA — 1-4-8
      name: "1. Ruck 1 — 1-4-8",
      obj: "Ruck 1 vinta: il 9 ha la palla, 2-5-7 si preparano",
      desc: "La ruck 1 è stata vinta da 1-4-8. Il 9 ha la palla dietro la ruck e legge la difesa. La mini unit 2-5-7 è posizionata a sinistra pronta a ricevere e avanzare sulla chiamata ROSSO.",
      callout: "ROSSO",
      players: [
        { id: 1, n: 1, x: 718, y: 622, c: C.pod1 },
        { id: 4, n: 4, x: 700, y: 618, c: C.pod1 },
        { id: 8, n: 8, x: 736, y: 620, c: C.pod1 },
        { id: 9, n: 9, x: 678, y: 638, c: C.med  },
        { id: 2, n: 2, x: 578, y: 652, c: C.pod2 },
        { id: 5, n: 5, x: 556, y: 658, c: C.pod2 },
        { id: 7, n: 7, x: 534, y: 654, c: C.pod2 },
      ],
      defense: [
        { x: 750, y: 562 }, { x: 694, y: 562 }, { x: 630, y: 562 },
        { x: 562, y: 562 }, { x: 490, y: 562 }, { x: 410, y: 562 },
        { x: 326, y: 562 }, { x: 240, y: 562 }, { x: 154, y: 562 },
      ],
      lines: [],
      labels: [
        { t: "RUCK 1 — 1-4-8",  x: 718, y: 604, c: C.pod1 },
        { t: "2-5-7 pronti ←", x: 556, y: 636, c: C.pod2 },
      ],
      pods: [{ cx: 718, cy: 620, rx: 30, ry: 14, c: C.pod1 }],
      gl: 524,
    },
    { // 2 ─ 9 SERVE 2-5-7 — AVANZANO
      name: "2. 9 serve 2-5-7 — Avanzano",
      obj: "La mini unit riceve e avanza compatta verso la difesa",
      desc: "Il 9 serve corto la mini unit 2-5-7. I tre partono compatti verso la difesa: il 5 è il vertice, il 2 e il 7 ai fianchi. Il blocco 1-4-8 resta in supporto dietro.",
      callout: "ROSSO",
      players: [
        { id: 1, n: 1, x: 720, y: 614, c: C.dim  },
        { id: 4, n: 4, x: 702, y: 610, c: C.dim  },
        { id: 8, n: 8, x: 738, y: 612, c: C.dim  },
        { id: 9, n: 9, x: 652, y: 626, c: C.med  },
        { id: 2, n: 2, x: 494, y: 578, c: C.pod2 },
        { id: 5, n: 5, x: 474, y: 574, c: C.pod2 },
        { id: 7, n: 7, x: 512, y: 577, c: C.pod2 },
      ],
      defense: [
        { x: 746, y: 528 }, { x: 682, y: 528 }, { x: 610, y: 528 },
        { x: 536, y: 528 }, { x: 486, y: 530, hit: true }, { x: 420, y: 528 },
        { x: 342, y: 528 }, { x: 256, y: 528 }, { x: 168, y: 528 },
      ],
      lines: [
        { from: [648, 628], to: [508, 588], c: C.med,  lb: "9 →" },
        { from: [484, 576], to: [484, 540], c: C.pod2, lb: "AVANZA!", thick: true },
      ],
      labels: [
        { t: "5 vertice", x: 474, y: 558, c: "rgba(255,255,255,0.2)", s: true },
      ],
      pods: [{ cx: 493, cy: 577, rx: 30, ry: 14, c: C.pod2 }],
      gl: 490,
    },
    { // 3 ─ RUCK 2 — 2-5-7
      name: "3. Ruck 2 — 2-5-7",
      obj: "Mini unit fa contatto e forma ruck 2",
      desc: "La mini unit 2-5-7 ha caricato e formato la ruck 2. Il 9 è pronto dietro. Il blocco 1-4-8 si avvicina a supporto per mantenere il possesso.",
      callout: "ROSSO",
      players: [
        { id: 1, n: 1, x: 620, y: 606, c: C.dim  },
        { id: 4, n: 4, x: 602, y: 602, c: C.dim  },
        { id: 8, n: 8, x: 638, y: 604, c: C.dim  },
        { id: 9, n: 9, x: 472, y: 540, c: C.med  },
        { id: 2, n: 2, x: 492, y: 512, c: C.ruck },
        { id: 5, n: 5, x: 474, y: 508, c: C.ruck },
        { id: 7, n: 7, x: 510, y: 514, c: C.ruck },
      ],
      defense: [
        { x: 744, y: 494 }, { x: 676, y: 494 }, { x: 600, y: 494 },
        { x: 524, y: 494 }, { x: 486, y: 496 }, { x: 410, y: 494 },
        { x: 328, y: 494 }, { x: 244, y: 494 }, { x: 158, y: 494 },
      ],
      lines: [],
      labels: [
        { t: "RUCK 2 — 2-5-7", x: 492, y: 494, c: C.ruck },
      ],
      pods: [{ cx: 492, cy: 511, rx: 30, ry: 14, c: C.ruck }],
      gl: 458,
    },
  ],
};
