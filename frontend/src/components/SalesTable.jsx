function SalesTable({ sales }) {
  return (
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
  )
}

export default SalesTable