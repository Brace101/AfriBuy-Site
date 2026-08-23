import React from 'react'
import './skeleton.css'

// A single product-card-shaped placeholder, matching the real .product-card layout.
export const ProductCardSkeleton = () => (
  <div className="product-card skeleton-card" aria-hidden="true">
    <div className="skeleton-block skeleton-image" />
    <div className="skeleton-block skeleton-line skeleton-line-title" />
    <div className="skeleton-block skeleton-line skeleton-line-rating" />
    <div className="skeleton-block skeleton-line skeleton-line-price" />
    <div className="skeleton-block skeleton-btn" />
  </div>
)

// A grid of skeleton cards, sized to match .product-grid.
export const ProductGridSkeleton = ({ count = 12 }) => (
  <div className="product-grid" role="status" aria-label="Loading products">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export default ProductGridSkeleton
