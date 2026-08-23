// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectWishlistItems, removeItem } from '../../store/wishlistSlice'
// import { addItem as addCartItem } from '../../store/cartSlice'
// import { useToast } from '../common/useToast'
// import { formatNaira } from '../../utils/currency'
// import { Rating } from '../productHomePage/ProductCart'
// import './wishlist.css'

// const Wishlist = () => {
//   const dispatch = useDispatch()
//   const { showToast } = useToast()
//   const items = useSelector(selectWishlistItems)

//   const handleRemove = (product) => {
//     dispatch(removeItem(product.id))
//     showToast(`${product.name} removed from wishlist`, { icon: '💔' })
//   }

//   const handleAddToCart = (product) => {
//     dispatch(addCartItem(product))
//     showToast(`${product.name} added to cart`, { icon: '🛒' })
//   }

//   return (
//     <div className="wishlist-page">
//       <div className="wishlist-topbar">
//         <Link to="/" className="wishlist-logo">
//           <img src="/afribuy-logo-nav.svg" alt="AfriBuy" className="wishlist-logo-img" />
//         </Link>
//         <Link to="/" className="wishlist-back">← Continue Shopping</Link>
//       </div>

//       <div className="wishlist-header">
//         <h1>My Wishlist</h1>
//         <p>{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
//       </div>

//       {items.length === 0 ? (
//         <div className="wishlist-empty">
//           <span className="wishlist-empty-icon">🤍</span>
//           <h2>Your wishlist is empty</h2>
//           <p>Save items you love by tapping the heart icon on any product.</p>
//           <Link to="/" className="wishlist-empty-cta">Start Shopping</Link>
//         </div>
//       ) : (
//         <div className="wishlist-grid">
//           {items.map((product) => (
//             <div key={product.id} className="wishlist-card">
//               <button
//                 className="wishlist-remove-btn"
//                 onClick={() => handleRemove(product)}
//                 aria-label="Remove from wishlist"
//               >
//                 ✕
//               </button>
//               <Link to={`/product/${product.id}`} className="wishlist-card-link">
//                 <div className="wishlist-image">
//                   {product.discount && <span className="discount-tag">-{product.discount}%</span>}
//                   <img src={product.image} alt={product.name || 'Product image'} />
//                 </div>
//                 <h3 className="wishlist-name">{product.name}</h3>
//                 <Rating value={product.rating} />
//                 <div className="price-row">
//                   <span className="price">{formatNaira(product.price)}</span>
//                   {product.originalPrice && (
//                     <span className="original-price">{formatNaira(product.originalPrice)}</span>
//                   )}
//                 </div>
//               </Link>
//               <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
//                 🛒 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Wishlist
