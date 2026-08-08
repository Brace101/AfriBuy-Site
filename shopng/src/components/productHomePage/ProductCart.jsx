import React from 'react'

const Star = ({ filled, half }) => {
  if (half) return <span className="star half">★</span>
  return <span className={`star ${filled ? 'filled' : ''}`}>★</span>
}

const Rating = ({ value = 0 }) => {
  const fullStars = Math.floor(value)
  const hasHalf = value % 1 !== 0

  return (
    <div className="rating">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) return <Star key={i} filled />
        if (i === fullStars && hasHalf) return <Star key={i} half />
        return <Star key={i} />
      })}
      <span className="rating-value">{value}/5</span>
    </div>
  )
}

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name || 'Product Image'} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <Rating value={product.rating} />
      <div className="price-row">
        <span className="price">${product.price}</span>
        {product.originalPrice && (
          <span className="original-price">${product.originalPrice}</span>
        )}
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </div>
      <button className="add-to-cart" onClick={() => onAddToCart && onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard