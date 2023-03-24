import React from 'react'

function Search() {
  return (
    <div>
        <form className="d-flex ms-4 mt-1 mb-1" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-warning" type="submit">Search</button>
        </form>

    </div>
  )
}

export default Search