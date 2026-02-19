export default function ScenarioMenu({ tabs, activeKey, onSelect }) {
  return (
    <div className="scenario-menu">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`scenario-tab${activeKey === tab.key ? " scenario-tab--active" : ""}${!tab.available ? " scenario-tab--unavailable" : ""}`}
          onClick={() => onSelect(tab.key)}
        >
          <span className="scenario-tab-icon">{tab.icon}</span>
          <span className="scenario-tab-text">
            <span className="scenario-tab-label">{tab.label}</span>
            <span className="scenario-tab-dir">{tab.dir}</span>
          </span>
          {!tab.available && <span className="scenario-tab-badge">Presto</span>}
        </button>
      ))}
    </div>
  );
}
