import mischaSinistra from "./mischia-sinistra";
import mischaDestra from "./mischia-destra";
import toucheSinistra from "./touche-sinistra";
import toucheDestra from "./touche-destra";
import giocataRossa from "./giocata-rossa";
import calcioAttaccoImg from "../assets/calcio_inizio_attacco.png";
import calcioRicezioneImg from "../assets/calcio_inizio_ricezione.png";

export default {
  "mischia-sinistra": mischaSinistra,
  "mischia-destra":   mischaDestra,
  "touche-sinistra":  toucheSinistra,
  "touche-destra":    toucheDestra,
  "giocata-rossa":    giocataRossa,
  "calcio-attacco":   { title: "Calcio Inizio — Attacco",   type: "image", imageSrc: calcioAttaccoImg,   phases: [] },
  "calcio-ricezione": { title: "Calcio Inizio — Ricezione", type: "image", imageSrc: calcioRicezioneImg, phases: [] },
};
