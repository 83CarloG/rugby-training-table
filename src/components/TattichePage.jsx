export default function TattichePage() {
  return (
    <div className="tattiche-wrap">
      <h1 className="tattiche-hero">🏉 Sistema di Gioco degli Avanti</h1>

      {/* Situazione 1 */}
      <section className="tac-section">
        <div className="tac-section-header">
          <span className="tac-num">1</span>
          Mischia a Favore — Uscita a Destra
        </div>
        <div className="tac-field-bar">◄ MISCHIA · · · · · LARGO ►</div>
        <div className="tac-cols">
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--red">1° Pod</div>
            <div className="tac-col-players">3 – 5 – 8</div>
            <div className="tac-col-desc">1° attacco vicino alla mischia</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--blue">2° Pod</div>
            <div className="tac-col-players">2 – 4 – 6</div>
            <div className="tac-col-desc">2° attacco più al centro</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--purple">3° Pod</div>
            <div className="tac-col-players">7 – 1</div>
            <div className="tac-col-desc">Aiuto trequarti (7 primo, 1 lo segue)</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--green">Larghi</div>
            <div className="tac-col-players">Trequarti</div>
            <div className="tac-col-desc">Opzione esterna</div>
          </div>
        </div>
      </section>

      {/* Situazione 2 */}
      <section className="tac-section">
        <div className="tac-section-header">
          <span className="tac-num">2</span>
          Mischia a Favore — Uscita a Sinistra
        </div>
        <div className="tac-field-bar">◄ LARGO · · · · · MISCHIA ►</div>
        <div className="tac-cols">
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--green">Larghi</div>
            <div className="tac-col-players">Trequarti</div>
            <div className="tac-col-desc">Opzione esterna</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--purple">3° Pod</div>
            <div className="tac-col-players">6 – 3</div>
            <div className="tac-col-desc">Aiuto trequarti (6 primo, 3 lo segue)</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--blue">2° Pod</div>
            <div className="tac-col-players">2 – 5 – 7</div>
            <div className="tac-col-desc">2° attacco più al centro</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--red">1° Pod</div>
            <div className="tac-col-players">1 – 4 – 8</div>
            <div className="tac-col-desc">1° attacco vicino alla mischia</div>
          </div>
        </div>
      </section>

      {/* Situazione 3 */}
      <section className="tac-section">
        <div className="tac-section-header">
          <span className="tac-num">3</span>
          Touche
        </div>
        <div className="tac-cols">
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--amber">Ruck</div>
            <div className="tac-col-desc">Chi ha fatto la presa + 2 vicini</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--red">Pod Corto</div>
            <div className="tac-col-desc">3 giocatori vicini</div>
          </div>
          <div className="tac-col">
            <div className="tac-col-tag tac-tag--green">Larghi</div>
            <div className="tac-col-desc">2 rimasti → vanno con i trequarti (dietro al 10 o 1° centro)</div>
          </div>
        </div>
      </section>

      {/* Le 3 Giocate */}
      <section className="tac-section">
        <div className="tac-section-title">Le 3 Giocate</div>
        <div className="tac-giocate">
          <div className="tac-giocata" style={{ borderLeftColor: "#ef4444", background: "rgba(239,68,68,0.05)" }}>
            <div className="tac-giocata-header">
              <span className="tac-giocata-dot" style={{ background: "#ef4444" }} />
              <span className="tac-giocata-color" style={{ color: "#f87171" }}>ROSSO</span>
              <span className="tac-giocata-name">Attacco col Pod</span>
            </div>
            <div className="tac-giocata-what">Il pod corto attacca direttamente dentro. Carry corto, potente, vicino alla fonte del pallone.</div>
            <div className="tac-giocata-when-label">Quando</div>
            <div className="tac-giocata-when">Squadra stanca o lenta → opzione semplice e diretta per cercare di guadagnare terreno.</div>
          </div>

          <div className="tac-giocata" style={{ borderLeftColor: "#3b82f6", background: "rgba(59,130,246,0.05)" }}>
            <div className="tac-giocata-header">
              <span className="tac-giocata-dot" style={{ background: "#3b82f6" }} />
              <span className="tac-giocata-color" style={{ color: "#60a5fa" }}>BLU</span>
              <span className="tac-giocata-name">Pod dopo il 10</span>
            </div>
            <div className="tac-giocata-what">Il 10 attacca la linea e scarica fuori. Il pod centro porta la palla. Giocata su due tempi, più larga.</div>
            <div className="tac-giocata-when-label">Quando</div>
            <div className="tac-giocata-when">Difesa compressa sul corto → si allarga il punto di attacco per creare spazio.</div>
          </div>

          <div className="tac-giocata" style={{ borderLeftColor: "#22c55e", background: "rgba(34,197,94,0.05)" }}>
            <div className="tac-giocata-header">
              <span className="tac-giocata-dot" style={{ background: "#22c55e" }} />
              <span className="tac-giocata-color" style={{ color: "#4ade80" }}>VERDE</span>
              <span className="tac-giocata-name">Attacco dei trequarti (Scudo/Ondata)</span>
            </div>
            <div className="tac-giocata-what">
              <strong>Scudo</strong> — avanti davanti ai trequarti: offrono linee di corsa e opzioni di passaggio.<br />
              <strong>Ondata</strong> — avanti dietro: pronti a formare un pod o aiutare i trequarti.
            </div>
            <div className="tac-giocata-when-label">Quando</div>
            <div className="tac-giocata-when">Dipende dalla posizione degli avanti al momento della chiamata.</div>
          </div>
        </div>
      </section>

      {/* Regole */}
      <section className="tac-section">
        <div className="tac-section-title">Regole Sempre Valide</div>
        <div className="tac-rules">
          <div className="tac-rule">✅ Ruck corte — niente ammucchiate</div>
          <div className="tac-rule">✅ Restare tutti in piedi</div>
          <div className="tac-rule">✅ Correre verso il pod (non aspettare fermi)</div>
        </div>
      </section>

      <div className="tac-keyphrase">⚡ USCIAMO – CORRIAMO – GIOCHIAMO ⚡</div>
    </div>
  );
}
