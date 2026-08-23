import React, { useState, useEffect, useRef } from 'react'
import { formatNaira } from '../../utils/currency'

const SearchBar = ({ allProducts, onSelectResult }) => {
  const [term, setTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef(null)

  const results = term.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(term.toLowerCase())).slice(0, 6)
    : []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (product) => {
    onSelectResult(product)
    setTerm('')
    setIsOpen(false)
  }

  return (
    <div className="search-wrap" ref={wrapRef}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder='Search for products...'
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => term && setIsOpen(true)}
      />

      {isOpen && term.trim() && (
        <div className="search-dropdown">
          {results.length === 0 && (
            <p className="search-no-results">No products found for "{term}"</p>
          )}
          {results.map((product) => (
            <div
              key={product.id}
              className="search-result"
              onClick={() => handleSelect(product)}
            >
              <div className="search-result-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="search-result-info">
                <p className="search-result-name">{product.name}</p>
                <p className="search-result-price">{formatNaira(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar