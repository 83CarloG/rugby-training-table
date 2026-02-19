import { useState, useEffect, useRef } from "react";
import "./App.css";
import scenarios from "./data/index";
import FieldView from "./components/FieldView";
import PhaseNav from "./components/PhaseNav";
import Legend from "./components/Legend";
import ScenarioMenu from "./components/ScenarioMenu";

const TABS = [
  { key: "mischia-sinistra", icon: "🏉", label: "Mischia", dir: "← Sin." },
  { key: "mischia-destra",   icon: "🏉", label: "Mischia", dir: "Dx →"   },
  { key: "touche-sinistra",  icon: "🤲", label: "Touche",  dir: "← Sin." },
  { key: "touche-destra",    icon: "🤲", label: "Touche",  dir: "Dx →"   },
].map(t => ({ ...t, available: scenarios[t.key].phases.length > 0 }));

export default function App() {
  const [activeScenario, setActiveScenario] = useState("mischia-sinistra");
  const [ph, setPh] = useState(0);
  const [auto, setAuto] = useState(false);
  const timer = useRef(null);

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

  const isAvailable = scenario.phases.length > 0;
  const activeTab = TABS.find(t => t.key === activeScenario);

  return (
    <div className="app-wrap">
      <div className="sticky-header">
        <header className="app-header">
          <div className="header-label">Sistema Tattico Avanti</div>
        </header>
        <ScenarioMenu tabs={TABS} activeKey={activeScenario} onSelect={setActiveScenario} />
      </div>

      <div className="app-inner">
        {isAvailable ? (
          <>
            <h1 className="scenario-title">{scenario.title}</h1>

            {p && p.obj && (
              <div className="obj-bar">
                <span className="obj-icon">🎯</span>
                <span className="obj-text">{p.obj}</span>
              </div>
            )}

            <div className="field-wrap">
              <FieldView idx={ph} scenario={scenario} />
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

            <Legend />
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
    </div>
  );
}
