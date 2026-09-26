# Revisione tattica degli schemi

Questa lista prepara la verifica dell'allenatore. Le correzioni editoriali nel codice non costituiscono un'approvazione tecnica delle giocate.

## Verifiche richieste

1. Controllare il percorso della palla in `src/data/timeline-meta.js` per tutte le 43 fasi, in particolare possesso dopo ogni ruck e ordine dei passaggi nelle fasi di espansione. I percorsi sono stati ricavati dalle descrizioni esistenti.
2. Confrontare le due versioni speculari di mischia e touche: numeri dei pod, direzione dell'uscita, lato della ruck finale e posizione della difesa.
3. Chiarire la chiamata nella fase 5 delle due touche: il nome dice **BLU** mentre la descrizione mostra un servizio diretto del 9 al pod 5-6-7. Confermare se sia la giocata BLU o ROSSO e aggiornare nome, obiettivo, testo e percorso della palla insieme.
4. Verificare la descrizione di **VERDE Scudo**: il testo deve rappresentare le linee di corsa e le opzioni realmente allenate, senza suggerire un'ostruzione.
5. Verificare con il gruppo il tempo e l'ordine di corsa dei giocatori nelle fasi. I keyframe attuali sono una prima temporizzazione didattica derivata dai fotogrammi statici, non una registrazione di movimenti reali.
6. Rivedere la pagina Tattiche e i due schemi di calcio rispetto al documento `docs/rugby_tactics.docx` e alla pratica attuale della squadra.

## Correzioni già applicate

- Eliminato il numero 1 duplicato nelle due mischie.
- Allineato l'obiettivo della touche destra al nome BLU della fase 5, in attesa della decisione sul punto 3.
- Corretta la direzione della ruck nelle descrizioni dell'ultima fase delle due mischie.
- Sostituite alcune frasi che presentavano esiti tattici come garantiti.
