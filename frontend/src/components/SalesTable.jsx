function SalesTable({ sales }) {
  return (
    <div className="table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th style={{width:'130px'}}>Transaction ID</th>
            <th style={{width:'100px'}}>Date</th>
            <th style={{width:'110px'}}>Customer ID</th>
            <th style={{width:'160px'}}>Customer Name</th>
            <th style={{width:'130px'}}>Phone Number</th>
            <th style={{width:'90px'}}>Gender</th>
            <th style={{width:'70px'}}>Age</th>
            <th style={{width:'150px'}}>Product Category</th>
            <th style={{width:'90px'}}>Quantity</th>
            <th style={{width:'120px'}}>Total Amount</th>
            <th style={{width:'140px'}}>Customer Region</th>
            <th style={{width:'110px'}}>Product ID</th>
            <th style={{width:'160px'}}>Employee Name</th>
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