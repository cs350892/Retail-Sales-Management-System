import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import SearchBar from '../components/SearchBar'
import SalesTable from '../components/SalesTable'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import { fetchSales } from '../services/api'
import SummaryCards from '../components/SummaryCards'
import FiltersBar from '../components/FiltersBar'

function SalesPage() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    Region: '', Gender: '', AgeRange: '', Category: '', Tags: '', PaymentMethod: '', Date: ''
  })
  const [sortBy, setSortBy] = useState('name-asc')

  const fetchSalesData = (searchTerm = '', pageNum = 1) => {
    console.log('Fetching sales data with searchTerm:', searchTerm, 'pageNum:', pageNum)
    setLoading(true)
    // Map current UI filters to backend query params
    const toArray = (v) => (v ? [v] : [])
    fetchSales({
      search: searchTerm,
      page: pageNum,
      limit: 10,
      regions: toArray(filters.Region),
      genders: toArray(filters.Gender),
      categories: toArray(filters.Category),
      tags: toArray(filters.Tags),
      payments: toArray(filters.PaymentMethod),
      // Age range UI is currently a preset; keep empty until number inputs are added
      ageMin: '',
      ageMax: '',
      dateFrom: '',
      dateTo: '',
      // Use sort mapped to backend options
      sort: sortBy === 'name-asc' ? 'name-asc' : sortBy === 'name-desc' ? 'name-desc' : 'date-desc'
    })
      .then((data) => {
        console.log('Data received:', data)
        setSales(data.data || [])
        setTotalPages(data.totalPages || 1)
        setLoading(false)
        console.log('Sales set to:', (data.data || []).length, 'items')
      })
      .catch((error) => {
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
      <Sidebar active="Sales" />
      <div className="main-container">
        <Topbar />
        <main className="content">
          <h2>Sales Data</h2>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <Loader />
          ) : (
            <>
              <FiltersBar
                options={buildOptions(sales)}
                value={filters}
                onChange={setFilters}
                sortValue={sortBy}
                onSortChange={setSortBy}
              />
              <SummaryCards sales={applySort(applyFilters(sales, filters), sortBy)} />
              <SalesTable sales={applySort(applyFilters(sales, filters), sortBy)} />
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

// Helpers to build options and filter client-side
function buildOptions(sales) {
  const uniq = (arr) => Array.from(new Set(arr.filter(Boolean))).sort()
  const regions = uniq(sales.map(s => s.Region))
  const genders = uniq(sales.map(s => s.Gender))
  const categories = uniq(sales.map(s => s.Category))
  const tags = uniq(sales.flatMap(s => Array.isArray(s.Tags) ? s.Tags : []))
  const payment = uniq(sales.map(s => s.PaymentMethod))
  const dates = uniq(sales.map(s => formatDateKey(s.Date)))

  const ageRanges = ['0-17','18-25','26-35','36-45','46-60','61+']

  return {
    Region: regions,
    Gender: genders,
    AgeRange: ageRanges,
    Category: categories,
    Tags: tags,
    PaymentMethod: payment,
    Date: dates
  }
}

function applyFilters(sales, f) {
  const inRange = (age, range) => {
    if (!range) return true
    if (range === '61+') return age >= 61
    const [min, max] = range.split('-').map(Number)
    return age >= min && age <= max
  }
  const same = (val, selected) => !selected || String(val) === String(selected)
  const dateKey = (d) => formatDateKey(d)

  return sales.filter(s =>
    same(s.Region, f.Region) &&
    same(s.Gender, f.Gender) &&
    inRange(Number(s.Age), f.AgeRange) &&
    same(s.Category, f.Category) &&
    (!f.Tags || (Array.isArray(s.Tags) && s.Tags.includes(f.Tags))) &&
    same(s.PaymentMethod, f.PaymentMethod) &&
    same(dateKey(s.Date), f.Date)
  )
}

function applySort(sales, sortBy) {
  const arr = [...sales]
  if (sortBy === 'name-asc') {
    arr.sort((a, b) => String(a.CustomerName).localeCompare(String(b.CustomerName)))
  } else if (sortBy === 'name-desc') {
    arr.sort((a, b) => String(b.CustomerName).localeCompare(String(a.CustomerName)))
  }
  return arr
}

function formatDateKey(d) {
  const date = new Date(d)
  if (isNaN(date.getTime())) return ''
  // Use YYYY-MM for month grouping
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`
}