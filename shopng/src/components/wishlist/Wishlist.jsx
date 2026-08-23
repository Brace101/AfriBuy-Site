import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectWishlistItems, removeFromWishlist } from '../../store/wishlistSlice'
import { addItem } from '../../store/cartSlice'
import { formatNaira } from '../../utils/currency'
import { Rating } from '../productHomePage/ProductCart'
import { useToast } from '../common/useToast'
import { useSeo } from '../../utils/useSeo'
import './wishlist.css'

const Wishlist = () => {
  useSeo({ title: 'Wishlist', description: 'Products you have saved for later on AfriBuy.' })

  const dispatch = useDispatch()
  const { showToast } = useToast()
  const items = useSelector(selectWishlistItems)

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product.id))
    showToast(`Removed ${product.name} from wishlist`, { icon: '💔' })
  }

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
    showToast(`${product.name} added to cart`, { icon: '🛒' })
  }

  return (
    <div className="wl-page">
      <div className="wl-topbar">
        <Link to="/" className="wl-logo">
          <img src="/afribuy-logo-nav.svg" alt="AfriBuy" className="wl-logo-img" />
        </Link>
        <Link to="/" className="wl-back">← Continue Shopping</Link>
      </div>

      <div className="wl-header">
        <h1>My Wishlist</h1>
        <p>{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {items.length === 0 ? (
        <div className="wl-empty">
          <span className="wl-empty-icon">🤍</span>
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart icon on any product to save it here for later.</p>
          <Link to="/" className="wl-empty-cta">Start Shopping</Link>
        </div>
      ) : (
        <div className="wl-grid">
          {items.map((product) => (
            <div key={product.id} className="wl-card">
              <button
                className="wl-remove"
                onClick={() => handleRemove(product)}
                aria-label={`Remove ${product.name} from wishlist`}
              >
                ✕
              </button>
              <Link to={`/product/${product.id}`} className="wl-card-link">
                <div className="wl-card-image">
                  {product.discount && <span className="discount-tag">-{product.discount}%</span>}
                  <img src={product.image} alt={product.name} />
                </div>
                <h3 className="wl-card-name">{product.name}</h3>
                <Rating value={product.rating} />
                <div className="price-row">
                  <span className="price">{formatNaira(product.price)}</span>
                  {product.originalPrice && (
                    <span className="original-price">{formatNaira(product.originalPrice)}</span>
                  )}
                </div>
              </Link>
              <button className="wl-add-to-cart" onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
