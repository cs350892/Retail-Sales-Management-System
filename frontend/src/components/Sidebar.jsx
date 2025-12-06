function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#" className="active">Sales</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar