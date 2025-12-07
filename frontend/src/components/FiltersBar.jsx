export default function FiltersBar({ options, value, onChange, sortValue, onSortChange }) {
  const handle = (key) => (e) => onChange({ ...value, [key]: e.target.value })

  return (
    <div style={styles.row}>
      <Select label="Region" opts={options.Region} val={value.Region} onChange={handle('Region')} />
      <Select label="Gender" opts={options.Gender} val={value.Gender} onChange={handle('Gender')} />
      <Select label="Age Range" opts={options.AgeRange} val={value.AgeRange} onChange={handle('AgeRange')} />
      <Select label="Category" opts={options.Category} val={value.Category} onChange={handle('Category')} />
      <Select label="Tags" opts={options.Tags} val={value.Tags} onChange={handle('Tags')} />
      <Select label="Payment" opts={options.PaymentMethod} val={value.PaymentMethod} onChange={handle('PaymentMethod')} />
      <Select label="Date" opts={options.Date} val={value.Date} onChange={handle('Date')} />
      <SortSelect label="Sort by" val={sortValue} onChange={onSortChange} />
    </div>
  )
}

function Select({ label, opts = [], val = '', onChange }) {
  return (
    <label style={styles.item}>
      <span style={styles.label}>{label}</span>
      <div style={styles.selectWrap}>
        <select value={val} onChange={onChange} style={styles.select}>
          <option value="">All</option>
          {opts.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span style={styles.arrow}>▾</span>
      </div>
    </label>
  )
}

function SortSelect({ label, val = 'name-asc', onChange }) {
  return (
    <label style={styles.item}>
      <span style={styles.label}>{label}</span>
      <div style={styles.selectWrap}>
        <select value={val} onChange={(e) => onChange(e.target.value)} style={styles.select}>
          <option value="name-asc">Customer Name (A-Z)</option>
          <option value="name-desc">Customer Name (Z-A)</option>
        </select>
        <span style={styles.arrow}>▾</span>
      </div>
    </label>
  )
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, minmax(140px, 1fr))',
    gap: '8px',
    alignItems: 'center',
    margin: '6px 0 12px'
  },
  item: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '12px', color: '#374151', marginBottom: '4px' },
  selectWrap: { position: 'relative' },
  select: {
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    padding: '8px 28px 8px 10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff'
  },
  arrow: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    pointerEvents: 'none'
  }
}
