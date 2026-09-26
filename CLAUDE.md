# ARN Sistema Tattico

Playbook React/Vite per studiare schemi di rugby da smartphone, tablet e desktop. Il progetto è client only: non ci sono account, backend o editor degli schemi.

## Comandi

```bash
npm ci
npm run dev
npm test
npm run build
```

I test usano `node:test`; la build produce `dist/`. Tutti gli otto scenari animati e le 43 fasi devono superare la validazione dei dati.

## Organizzazione

- `src/data/*.js`: posizioni, difesa, frecce e testi originali di ogni fase.
- `src/data/timeline-meta.js`: percorso della palla per ciascuna fase, nell'ordine dei giocatori che la toccano.
- `src/timeline.js`: prepara le fasi con durata, keyframe ed eventi; valida i dati e campiona giocatori, difensori e palla a un istante preciso.
- `src/playback.js`: reducer per scenario, tempo, velocità, pausa, selezione e vista del campo.
- `src/App.jsx`: UI, animazione `requestAnimationFrame`, scelta degli schemi e schede giocatore.
- `src/components/FieldView.jsx`: rendering SVG e gesti di trascinamento/zoom.

Il tempo di riproduzione è unico per l'intero scenario. Un salto a una fase parte dal fotogramma visibile, riproduce la fase scelta e si ferma sul suo ultimo fotogramma; il cambio scenario azzera il tempo nello stesso aggiornamento di stato. La modalità movimento ridotto mostra il fotogramma finale di ogni fase e rispetta la preferenza del sistema, con un controllo manuale nella UI.

## Aggiornare una giocata

Modificare le posizioni e i testi nel relativo file in `src/data/`, poi aggiornare l'array corrispondente in `timeline-meta.js` se cambia chi porta o riceve la palla. Ogni numero nel percorso deve essere presente tra i giocatori di quella fase. Eseguire `npm test` e `npm run build`, poi verificare il risultato nel browser almeno a 390 px, 768 px e su desktop.

Le indicazioni tecniche e il percorso della palla derivati dai testi richiedono la revisione dell'allenatore prima dell'uso ufficiale: vedi `docs/tactical-review.md`.
