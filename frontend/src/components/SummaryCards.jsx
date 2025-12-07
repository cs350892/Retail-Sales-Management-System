export default function SummaryCards({ sales }) {
  const totals = sales.reduce(
    (acc, s) => {
      const qty = Number(s.Quantity) || 0
      const totalAmount = Number(s.FinalAmount ?? s.TotalAmount) || 0
      const gross = Number(s.TotalAmount ?? s.FinalAmount) || 0
      const discount = Math.max(gross - totalAmount, 0)

      acc.units += qty
      acc.amount += totalAmount
      acc.discount += discount
      return acc
    },
    { units: 0, amount: 0, discount: 0 }
  )

  const formatCurrency = (v) => v.toLocaleString(undefined, { style: 'currency', currency: 'INR' })

  return (
    <div style={styles.wrapper}>
      <Card color="#16a34a" icon="📦" label="Total Units" value={totals.units.toLocaleString()} />
      <Card color="#16a34a" icon="💰" label="Total Amount" value={formatCurrency(totals.amount)} />
      <Card color="#16a34a" icon="🏷️" label="Total Discount" value={formatCurrency(totals.discount)} />
    </div>
  )
}

function Card({ color, icon, label, value }) {
  return (
    <div style={{ ...styles.card, borderColor: color }}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.content}>
        <div style={styles.label}>{label}</div>
        <div style={styles.value}>{value}</div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
    marginBottom: '16px'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '2px solid',
    background:
      'linear-gradient(135deg, rgba(22,163,74,0.12), rgba(22,163,74,0.06))',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  icon: {
    fontSize: '22px',
    marginRight: '12px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '13px',
    color: '#065f46'
  },
  value: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#064e3b'
  }
}
