import { useState, useEffect } from 'react'
import '../styles/App.css'
import { fetchSales } from '../services/api'

function App() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchSalesData = (searchTerm = '', pageNum = 1) => {
    setLoading(true)
    fetchSales(searchTerm, pageNum, 10)
      .then(data => {
        setSales(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching sales:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSales()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchSales(search, 1)
  }

  return (
    <div className="app">
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
      <div className="main-container">
        <header className="topbar">
          <h1>Sales Management System</h1>
        </header>
        <main className="content">
          <h2>Sales Data</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Name, Phone no.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
          {loading ? (
            <p>Loading sales data...</p>
          ) : (
            <div className="table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Product Category</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Customer Region</th>
                    <th>Product ID</th>
                    <th>Employee Name</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, index) => (
                    <tr key={sale._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                      <td>{sale._id}</td>
                      <td>{new Date(sale.Date).toLocaleDateString()}</td>
                      <td>{sale.CustomerID}</td>
                      <td>{sale.CustomerName}</td>
                      <td>{sale.Phone}</td>
                      <td>{sale.Gender}</td>
                      <td>{sale.Age}</td>
                      <td>{sale.Category}</td>
                      <td>{sale.Quantity}</td>
                      <td>{sale.TotalAmount}</td>
                      <td>{sale.Region}</td>
                      <td>{sale.ProductID}</td>
                      <td>{sale.EmployeeName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
