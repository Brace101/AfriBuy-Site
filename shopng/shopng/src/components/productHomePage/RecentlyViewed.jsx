import React from 'react'
import { useSelector } from 'react-redux'
import { selectRecentlyViewed } from '../../store/recentlyViewedSlice'
import ProductCard from './ProductCart'

const RecentlyViewed = ({ onAddToCart }) => {
  const items = useSelector(selectRecentlyViewed)

  if (items.length === 0) return null

  return (
    <div className="product-section bordered">
      <h2 className="section-title">RECENTLY VIEWED</h2>
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
