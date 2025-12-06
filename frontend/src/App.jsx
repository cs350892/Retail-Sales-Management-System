import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/sales?page=1&limit=10')
      .then(response => response.json())
      .then(data => {
        setSales(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching sales:', error)
        setLoading(false)
      })
  }, [])

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
