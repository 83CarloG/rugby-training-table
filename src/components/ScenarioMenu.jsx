export default function ScenarioMenu({ groups, activeKey, onSelect }) {
  const group = groups.find(item => item.items.some(scenario => scenario.key === activeKey)) || groups[0];
  return (
    <div className="scenario-picker" aria-label="Scelta dello schema">
      <div className="scenario-categories" role="group" aria-label="Categoria">
        {groups.map(item => (
          <button
            key={item.label}
            type="button"
            className={item.label === group.label ? "category-button category-button--active" : "category-button"}
            aria-pressed={item.label === group.label}
            onClick={() => onSelect(item.items[0].key)}
          >{item.label}</button>
        ))}
      </div>
      <label className="scenario-select-label" htmlFor="scenario-select">Schema</label>
      <select id="scenario-select" className="scenario-select" value={activeKey} onChange={event => onSelect(event.target.value)}>
        {group.items.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}
      </select>
    </div>
  );
}
