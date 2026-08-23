import React from 'react'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
]

const formatCategoryLabel = (category) =>
  category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

const FilterSortBar = ({ categories, category, onCategoryChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-sort-bar">
      <div className="filter-sort-field">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{formatCategoryLabel(c)}</option>
          ))}
        </select>
      </div>

      <div className="filter-sort-field">
        <label htmlFor="sort-by">Sort by</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterSortBar
