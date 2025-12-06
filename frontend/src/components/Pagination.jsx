function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1}
        className="page-btn"
      >
        Previous
      </button>
      <span className="page-info">
        Page {page} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages}
        className="page-btn"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination