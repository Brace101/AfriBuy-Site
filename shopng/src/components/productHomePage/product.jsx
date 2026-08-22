import React, { useState, useEffect, useRef } from 'react'
import ProductSection from './ProductSection'
import DressStyleSection from './DressStyleSection'
import TestimonialsSection from './TestimonialsSection'
import Newsletter from './Newsletter'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import SearchBar from './SearchBar'
import { mapApiProduct } from '../../utils/mapApiProduct'
import './product.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartCount } from '../../store/cartSlice'
import { selectCurrentUser, logout } from '../../store/authSlice'

const Product = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const cartItemCount = useSelector(selectCartCount)

  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFlyerVisible, setIsFlyerVisible] = useState(true)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  const accountMenuRef = useRef(null)
  const newArrivalsRef = useRef(null)
  const topSellingRef = useRef(null)
  const brandsRef = useRef(null)
  const newsletterRef = useRef(null)

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    dispatch(logout())
    setIsAccountMenuOpen(false)
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const allProducts = [...newArrivals, ...topSelling]

  const handleSelectSearchResult = (product) => {
    const isNewArrival = newArrivals.some((p) => p.id === product.id)
    scrollToSection(isNewArrival ? newArrivalsRef : topSellingRef)
  }

  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products?limit=12").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch new arrivals")
        return res.json()
      }),
      fetch("https://fakestoreapi.com/products?limit=20").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top selling")
        return res.json()
      }),
    ])
      .then(([arrivals, selling]) => {
        setNewArrivals(arrivals.map(mapApiProduct))
        setTopSelling(selling.slice(12).map(mapApiProduct))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {isFlyerVisible && !currentUser && (
        <div className="flyer">
          <div className="signup">
            Sign up and get 20% off your first order.{' '}
            <Link to="/signup">Sign Up Now</Link>
          </div>
          <div className="close" onClick={() => setIsFlyerVisible(false)}>x</div>
        </div>
      )}

      <div className="navbar">
        <div className="logo"><h1>AfriBuy</h1></div>
        <div>
          <ul className="nav-links">
            <li onClick={() => scrollToSection(newArrivalsRef)}>Shop <span className="caret">▾</span></li>
            <li onClick={() => scrollToSection(topSellingRef)}>On Sale</li>
            <li onClick={() => scrollToSection(newArrivalsRef)}>New Arrivals</li>
            <li onClick={() => scrollToSection(brandsRef)}>Brands</li>
          </ul>
        </div>

        <SearchBar allProducts={allProducts} onSelectResult={handleSelectSearchResult} />

        <div className="nav-icons">
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            🛒
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>

          <div className="account-menu-wrap" ref={accountMenuRef}>
            <button
              className="account-icon-btn"
              onClick={() => setIsAccountMenuOpen((open) => !open)}
              aria-label="Account menu"
            >
              {currentUser ? (
                <span className="account-avatar">{currentUser.fullName.trim().charAt(0).toUpperCase()}</span>
              ) : (
                <span className="text-xl">👤</span>
              )}
            </button>

            {isAccountMenuOpen && (
              <div className="account-dropdown">
                {currentUser ? (
                  <>
                    <p className="account-dropdown-greeting">Hi, {currentUser.fullName.split(' ')[0]}</p>
                    <p className="account-dropdown-email">{currentUser.email}</p>
                    <button className="account-dropdown-signout" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="account-dropdown-link" onClick={() => setIsAccountMenuOpen(false)}>
                      Log In
                    </Link>
                    <Link to="/signup" className="account-dropdown-link" onClick={() => setIsAccountMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE</h1>
          <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <button className="shop-now" onClick={() => scrollToSection(newArrivalsRef)}>Shop Now</button>

          <div className="stats">
            <div className="stat">
              <h2>200+</h2>
              <p>International Brands</p>
            </div>
            <div className="stat divider">
              <h2>2,000+</h2>
              <p>High-Quality Products</p>
            </div>
            <div className="stat divider">
              <h2>30,000+</h2>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <svg className="sparkle sparkle-1" width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z" fill="black"/>
          </svg>
          <svg className="sparkle sparkle-2" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 0C28 15.464 40.536 28 56 28C40.536 28 28 40.536 28 56C28 40.536 15.464 28 0 28C15.464 28 28 15.464 28 0Z" fill="black"/>
          </svg>
          <img src="/models.png" alt="Models wearing denim jackets" />
        </div>
      </div>

      <div className="brands" ref={brandsRef}>
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>CALVIN KLIEN</span>
      </div>

      <div ref={newArrivalsRef}>
        <ProductSection title="NEW ARRIVALS" products={newArrivals} loading={loading} error={error} initialCount={4} onAddToCart={handleAddToCart} />
      </div>
      <div ref={topSellingRef}>
        <ProductSection title="TOP SELLING" products={topSelling} loading={loading} error={error} bordered initialCount={4} onAddToCart={handleAddToCart} />
      </div>
      
      <DressStyleSection />
      <TestimonialsSection />
      
      <div ref={newsletterRef}>
        <Newsletter />
      </div>
      
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

export default Product