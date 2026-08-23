import React, { useState } from 'react'
import ProductCard from './ProductCart'

const ProductSection = ({ title, products = [], loading, error, bordered, initialCount = 4, onAddToCart }) => {
  const [expanded, setExpanded] = useState(false)

  const visibleProducts = expanded ? products : products.slice(0, initialCount)
  const hasMore = products.length > initialCount

  return (
    <div className={`product-section ${bordered ? 'bordered' : ''}`}>
      <h2 className="section-title">{title}</h2>

      {loading && <p>Loading products...</p>}
      {error && <p>Error loading products: {error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      {!loading && !error && hasMore && (
        <button className="view-all" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'View All'}
        </button>
      )}
    </div>
  )
}

export default ProductSection