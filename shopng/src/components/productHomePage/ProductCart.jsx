import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatNaira } from '../../utils/currency'
import { toggleWishlist, selectIsWishlisted } from '../../store/wishlistSlice'
import { getStockForProduct, isOutOfStock, isLowStock } from '../../utils/stock'
import { useToast } from '../common/useToast'

export const Star = ({ filled, half }) => {
  if (half) return <span className="star half">★</span>
  return <span className={`star ${filled ? 'filled' : ''}`}>★</span>
}

export const Rating = ({ value = 0 }) => {
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
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const isWishlisted = useSelector((state) => selectIsWishlisted(state, product?.id))

  if (!product) return null

  const stock = getStockForProduct(product.id)
  const outOfStock = isOutOfStock(product.id)
  const lowStock = isLowStock(product.id)

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
    showToast(
      isWishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      { icon: isWishlisted ? '💔' : '❤️' }
    )
  }

  return (
    <div className="product-card">
      <button
        className={`wishlist-heart ${isWishlisted ? 'active' : ''}`}
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={isWishlisted}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.discount && <span className="discount-tag">-{product.discount}%</span>}
          {outOfStock && <span className="stock-tag stock-tag-out">Sold Out</span>}
          {!outOfStock && lowStock && <span className="stock-tag stock-tag-low">Only {stock} left</span>}
          <img src={product.image} alt={product.name || 'Product Image'} />
        </div>
        <h3 className="product-name">{product.name}</h3>
        <Rating value={product.rating} />
        <div className="price-row">
          <span className="price">{formatNaira(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatNaira(product.originalPrice)}</span>
          )}
        </div>
      </Link>
      <button
        className="add-to-cart"
        disabled={outOfStock}
        onClick={(e) => {
          e.preventDefault()
          onAddToCart && onAddToCart(product)
        }}
      >
        {outOfStock ? 'Sold Out' : '🛒 Add to Cart'}
      </button>
    </div>
  )
}

export default ProductCard