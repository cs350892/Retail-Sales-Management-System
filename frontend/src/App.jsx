import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-content">
          <h2>Menu</h2>
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Sales</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="main-container">
        <header className="topbar">
          <h1>Sales Management System</h1>
        </header>
        <main className="content">
          <h2>Welcome to Sales Management System</h2>
          <p>Select a menu item to get started.</p>
        </main>
      </div>
    </div>
  )
}

export default App
