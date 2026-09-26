import mischaSinistra from "./mischia-sinistra";
import mischaDestra from "./mischia-destra";
import toucheSinistra from "./touche-sinistra";
import toucheDestra from "./touche-destra";
import giocataRossa from "./giocata-rossa";
import giocataBlu from "./giocata-blu";
import giocataVerdeScudo from "./giocata-verde-scudo";
import giocataVerdeOndata from "./giocata-verde-ondata";
import calcioAttaccoImg from "../assets/calcio_inizio_attacco.png";
import calcioRicezioneImg from "../assets/calcio_inizio_ricezione.png";

export default {
  "mischia-sinistra": mischaSinistra,
  "mischia-destra":   mischaDestra,
  "touche-sinistra":  toucheSinistra,
  "touche-destra":    toucheDestra,
  "giocata-rossa":    giocataRossa,
  "giocata-blu":          giocataBlu,
  "giocata-verde-scudo":  giocataVerdeScudo,
  "giocata-verde-ondata": giocataVerdeOndata,
  "calcio-attacco": {
    title: "Calcio d'inizio — Attacco", type: "image", imageSrc: calcioAttaccoImg, phases: [],
    description: "Schieramento per il calcio d'inizio: la maggior parte dei giocatori è in colonna sulla linea centrale; il 10 è vicino alla palla e il 15 è spostato sul lato sinistro.",
  },
  "calcio-ricezione": {
    title: "Calcio d'inizio — Ricezione", type: "image", imageSrc: calcioRicezioneImg, phases: [],
    description: "Schieramento di ricezione: i giocatori sono distribuiti nella metà sinistra del campo, con tre linee di profondità e la palla al centro.",
  },
};
