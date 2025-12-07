import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import SearchBar from '../components/SearchBar'
import SalesTable from '../components/SalesTable'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import { fetchSales } from '../services/api'
import SummaryCards from '../components/SummaryCards'

function SalesPage() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchSalesData = (searchTerm = '', pageNum = 1) => {
    console.log('Fetching sales data with searchTerm:', searchTerm, 'pageNum:', pageNum);
    setLoading(true)
    fetchSales(searchTerm, pageNum, 10)
      .then(data => {
        console.log('Data received:', data);
        setSales(data.data)
        setTotalPages(data.totalPages)
        setLoading(false)
        console.log('Sales set to:', data.data.length, 'items');
      })
      .catch(error => {
        console.error('Error in fetchSalesData:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSalesData()
  }, [])

  const handleSearch = (searchTerm) => {
    setPage(1)
    fetchSalesData(searchTerm, 1)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      fetchSalesData(search, newPage)
    }
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
        <Topbar />
        <main className="content">
          <h2>Sales Data</h2>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <Loader />
          ) : (
            <>
              <SummaryCards sales={sales} />
              <SalesTable sales={sales} />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default SalesPage