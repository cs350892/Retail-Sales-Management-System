function Sidebar({ active = 'Sales' }) {
  const items = ['Dashboard', 'Sales', 'Customers', 'Products', 'Reports']
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Menu</h2>
        <nav>
          <ul>
            {items.map((label) => (
              <li key={label}>
                <a href="#" className={label === active ? 'active' : ''}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar