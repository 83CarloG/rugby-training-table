// Passaggi e possesso per ogni fase, nell'ordine in cui i giocatori toccano la palla.
// Le posizioni rimangono nei dati degli scenari; queste indicazioni vanno validate
// dall'allenatore insieme ai testi tattici prima dell'uso ufficiale.
export const ballRoutes = {
  "mischia-sinistra": [
    [9], [9, 10, 12], [12, 9], [9, 8],
    [8, 9], [9, 6], [9, 10, 12, 13], [9, 8],
  ],
  "mischia-destra": [
    [9], [9, 10, 12], [12, 9], [9, 8],
    [8, 9], [9, 7], [9, 10, 12, 13], [9, 8],
  ],
  "touche-sinistra": [
    [2], [2, 4], [4, 9], [9], [9, 5], [5, 9], [9, 10, 12, 13],
  ],
  "touche-destra": [
    [2], [2, 4], [4, 9], [9], [9, 5], [5, 9], [9, 10, 12, 13],
  ],
  "giocata-rossa": [[9], [9, 5], [5, 9]],
  "giocata-blu": [[9], [9], [9, 10], [10, 4]],
  "giocata-verde-scudo": [[9], [9, 10], [10, 12, 13, 14]],
  "giocata-verde-ondata": [[9], [9, 10], [10, 12, 13]],
};
