import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(search)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
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
  )
}

export default SearchBar