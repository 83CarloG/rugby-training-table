import { useState, useEffect, useRef } from "react";
import "./App.css";
import scenarios from "./data/index";
import FieldView from "./components/FieldView";
import PhaseNav from "./components/PhaseNav";
import ScenarioMenu from "./components/ScenarioMenu";
import HomeMenu from "./components/HomeMenu";
import TattichePage from "./components/TattichePage";

const TABS = [
  { key: "mischia-sinistra", icon: "🏉", label: "Mischia", dir: "Dx →"    },
  { key: "mischia-destra",   icon: "🏉", label: "Mischia", dir: "← Sx"    },
  { key: "touche-sinistra",  icon: "🤲", label: "Touche",  dir: "Dx →"    },
  { key: "touche-destra",    icon: "🤲", label: "Touche",  dir: "← Sx"    },
  { key: "giocata-rossa",    icon: "🔴", label: "Giocata", dir: "Rossa"   },
  { key: "giocata-blu",         icon: "🔵", label: "Giocata", dir: "Blu"     },
  { key: "giocata-verde-scudo", icon: "🟢", label: "Giocata", dir: "Scudo"   },
  { key: "giocata-verde-ondata",icon: "🟢", label: "Giocata", dir: "Ondata"  },
  { key: "calcio-attacco",      icon: "⚽", label: "Calcio",  dir: "Attacco" },
  { key: "calcio-ricezione", icon: "⚽", label: "Calcio",  dir: "Ricezione"},
].map(t => ({ ...t, available: scenarios[t.key].phases.length > 0 || scenarios[t.key].type === "image" }));

export default function App() {
  const [view, setView] = useState("home");
  const [activeScenario, setActiveScenario] = useState("mischia-sinistra");
  const [ph, setPh] = useState(0);
  const [auto, setAuto] = useState(false);
  const timer = useRef(null);
  const touchStartX = useRef(null);
  const touchStartXMenu = useRef(null);
  const hintSeenRef = useRef(localStorage.getItem("swipe_hint_seen") === "1");
  const [showHint, setShowHint] = useState(false);

  const scenario = scenarios[activeScenario];
  const p = scenario.phases[ph];

  useEffect(() => {
    setPh(0);
    setAuto(false);
  }, [activeScenario]);

  useEffect(() => {
    if (!auto) { clearInterval(timer.current); return; }
    timer.current = setInterval(() => {
      setPh(v => {
        if (v >= scenario.phases.length - 1) { setAuto(false); return scenario.phases.length - 1; }
        return v + 1;
      });
    }, 3500);
    return () => clearInterval(timer.current);
  }, [auto, scenario.phases.length]);

  // Show swipe hint once on first non-image playbook view
  useEffect(() => {
    if (view === "playbook" && !hintSeenRef.current && scenario.type !== "image") {
      hintSeenRef.current = true;
      localStorage.setItem("swipe_hint_seen", "1");
      setShowHint(true);
      const t = setTimeout(() => setShowHint(false), 1500);
      return () => clearTimeout(t);
    }
  }, [view, activeScenario]);

  const onFieldTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onFieldTouchEnd = (e) => {
    if (auto) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setPh(v => Math.min(v + 1, scenario.phases.length - 1));
    else setPh(v => Math.max(v - 1, 0));
  };

  const onMenuTouchStart = (e) => { touchStartXMenu.current = e.touches[0].clientX; };
  const onMenuTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartXMenu.current;
    if (Math.abs(dx) < 60) return;
    const activeIdx = TABS.findIndex(t => t.key === activeScenario);
    const dir = dx < 0 ? 1 : -1;
    const next = TABS[activeIdx + dir];
    if (next) { setActiveScenario(next.key); setPh(0); setAuto(false); }
  };

  const isAvailable = scenario.phases.length > 0 || scenario.type === "image";
  const activeTab = TABS.find(t => t.key === activeScenario);

  function goBack() {
    setAuto(false);
    setView("home");
  }

  return (
    <div className="app-wrap">
      <div className="sticky-header">
        <header className="app-header">
          {view !== "home" && (
            <button className="header-back" onClick={goBack}>←</button>
          )}
          <div className="header-label">Sistema Tattico Avanti</div>
        </header>
        {view === "playbook" && (
          <div onTouchStart={onMenuTouchStart} onTouchEnd={onMenuTouchEnd}>
            <ScenarioMenu tabs={TABS} activeKey={activeScenario} onSelect={setActiveScenario} />
          </div>
        )}
      </div>

      {view === "home" && <HomeMenu onSelect={setView} />}

      {view === "playbook" && (
        <div className="app-inner">
          {isAvailable ? (
            <>
              <h1 className="scenario-title">{scenario.title}</h1>

              {scenario.type === "image" ? (
                <div className="image-panel">
                  <img src={scenario.imageSrc} alt={scenario.title} className="image-panel-img" />
                </div>
              ) : (
                <>
                  {p && p.obj && (
                    <div className="obj-bar">
                      <span className="obj-icon">🎯</span>
                      <span className="obj-text">{p.obj}</span>
                    </div>
                  )}

                  <div
                    className="field-wrap"
                    onTouchStart={onFieldTouchStart}
                    onTouchEnd={onFieldTouchEnd}
                  >
                    <FieldView idx={ph} scenario={scenario} />
                    {ph > 0 && <div className="swipe-arrow swipe-arrow--left">‹</div>}
                    {ph < scenario.phases.length - 1 && <div className="swipe-arrow swipe-arrow--right">›</div>}
                    {showHint && (
                      <div className="swipe-hint">
                        <div className="swipe-hint-hand">👆</div>
                      </div>
                    )}
                  </div>

                  <PhaseNav
                    phases={scenario.phases}
                    currentPhase={ph}
                    onPhaseChange={(i) => { setPh(i); setAuto(false); }}
                    auto={auto}
                    onPlayToggle={() => {
                      if (!auto) { setPh(0); setTimeout(() => setAuto(true), 80); }
                      else setAuto(false);
                    }}
                    onReset={() => { setPh(0); setAuto(false); }}
                  />

                  {p && p.desc && (
                    <div className="phase-desc">
                      <span className="phase-desc-label">Fase {ph + 1}: </span>{p.desc}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="coming-soon">
              <div className="coming-soon-icon">🏗️</div>
              <div className="coming-soon-title">
                {activeTab?.icon} {activeTab?.label} {activeTab?.dir}
              </div>
              <div className="coming-soon-text">In preparazione</div>
            </div>
          )}
        </div>
      )}

      {view === "tattiche" && <TattichePage />}
    </div>
  );
}
