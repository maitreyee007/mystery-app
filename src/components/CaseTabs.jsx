function CaseTabs({ activeTab, onChange, tabs }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default CaseTabs
