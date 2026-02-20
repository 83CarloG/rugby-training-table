import logo from "../assets/logo_old_arn.webp";

export default function HomeMenu({ onSelect }) {
  return (
    <div className="home-wrap">
      <div className="home-hero">
        <div className="home-badge">Sistema Tattico</div>
        <div className="home-logo-wrap">
          <img src={logo} alt="Amatori Rugby Novara" className="home-logo" />
        </div>
        <p className="home-sub">Scegli una sezione</p>
      </div>

      <div className="home-cards">
        <button className="home-card home-card--primary" onClick={() => onSelect("playbook")}>
          <span className="home-card-icon">🏉</span>
          <div className="home-card-body">
            <div className="home-card-label">Playbook</div>
            <div className="home-card-desc">Mischia · Touche · Sequenze di gioco</div>
          </div>
          <span className="home-card-arrow">›</span>
        </button>

        <button className="home-card home-card--muted" onClick={() => onSelect("tattiche")}>
          <span className="home-card-icon">📋</span>
          <div className="home-card-body">
            <div className="home-card-label">Tattiche</div>
            <div className="home-card-desc">Schemi e principi di gioco</div>
          </div>
          <span className="home-card-arrow">›</span>
        </button>
      </div>
    </div>
  );
}
