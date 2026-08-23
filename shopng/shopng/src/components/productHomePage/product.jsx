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
import { useToast } from '../common/useToast'

const Product = () => {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const currentUser = useSelector(selectCurrentUser)
  const cartItemCount = useSelector(selectCartCount)

  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFlyerVisible, setIsFlyerVisible] = useState(true)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false)

  const accountMenuRef = useRef(null)
  const helpMenuRef = useRef(null)
  const newArrivalsRef = useRef(null)
  const topSellingRef = useRef(null)
  const brandsRef = useRef(null)
  const newsletterRef = useRef(null)

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
    showToast(`${product.name} added to cart`, { icon: '🛒' })
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false)
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(e.target)) {
        setIsHelpMenuOpen(false)
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
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products")
        return res.json()
      })
      .then((data) => {
        const products = (data.products || []).map(mapApiProduct)
        setNewArrivals(products.slice(0, 40))
        setTopSelling(products.slice(40, 100))
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
        <div className="logo">
          <img src="/afribuy-logo-nav.svg" alt="AfriBuy" className="logo-img" />
        </div>
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
          <div className="account-menu-wrap" ref={accountMenuRef}>
            <button
              className="nav-icon-item"
              onClick={() => setIsAccountMenuOpen((open) => !open)}
              aria-label="Account menu"
            >
              {currentUser ? (
                <span className="account-avatar">{currentUser.fullName.trim().charAt(0).toUpperCase()}</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
              <span className="nav-icon-label">Account</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon-caret">
                <polyline points="6 9 12 15 18 9" />
              </svg>
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

          <div className="help-menu-wrap" ref={helpMenuRef}>
            <button
              className="nav-icon-item"
              onClick={() => setIsHelpMenuOpen((open) => !open)}
              aria-label="Help menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="nav-icon-label">Help</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon-caret">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isHelpMenuOpen && (
              <div className="account-dropdown">
                <a href="#" className="account-dropdown-link" onClick={() => setIsHelpMenuOpen(false)}>
                  Customer Support
                </a>
                <a href="#" className="account-dropdown-link" onClick={() => setIsHelpMenuOpen(false)}>
                  Delivery Details
                </a>
                <a href="#" className="account-dropdown-link" onClick={() => setIsHelpMenuOpen(false)}>
                  FAQs
                </a>
              </div>
            )}
          </div>

          <button className="nav-icon-item nav-icon-cart" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            <span className="nav-icon-cart-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </span>
            <span className="nav-icon-label">Cart</span>
          </button>
        </div>
      </div>

      <div className="hero">
        <svg className="sparkle sparkle-wide-left" width="40" height="40" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z" fill="black"/>
        </svg>
        <svg className="sparkle sparkle-wide-right" width="64" height="64" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z" fill="black"/>
        </svg>
        <div className="hero-inner">
          <div className="hero-highlight-badge">
            <span className="hero-highlight-icon">🚚</span>
            <div>
              <p className="hero-highlight-title">Free Delivery</p>
              <p className="hero-highlight-sub">On orders over ₦50,000</p>
            </div>
          </div>

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
            <div className="hero-image-backdrop" aria-hidden="true" />
            <svg className="sparkle sparkle-1" width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z" fill="black"/>
            </svg>
            <svg className="sparkle sparkle-2" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0C28 15.464 40.536 28 56 28C40.536 28 28 40.536 28 56C28 40.536 15.464 28 0 28C15.464 28 28 15.464 28 0Z" fill="black"/>
            </svg>
            <img src="/models.png" alt="Models wearing denim jackets" />
          </div>
        </div>
      </div>

      <div className="brands" ref={brandsRef}>
        <div className="brands-track">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>
          <span>RALPH LAUREN</span>
          <span>ARMANI</span>
          <span>HUGO BOSS</span>
          <span>BURBERRY</span>
          <span>LOUIS VUITTON</span>
          <span>CALVIN KLIEN</span>
          <span aria-hidden="true">VERSACE</span>
          <span aria-hidden="true">ZARA</span>
          <span aria-hidden="true">GUCCI</span>
          <span aria-hidden="true">PRADA</span>
          <span aria-hidden="true">RALPH LAUREN</span>
          <span aria-hidden="true">ARMANI</span>
          <span aria-hidden="true">HUGO BOSS</span>
          <span aria-hidden="true">BURBERRY</span>
          <span aria-hidden="true">LOUIS VUITTON</span>
          <span aria-hidden="true">CALVIN KLIEN</span>
        </div>
      </div>

      <div ref={newArrivalsRef}>
        <ProductSection title="NEW ARRIVALS" products={newArrivals} loading={loading} error={error} initialCount={12} onAddToCart={handleAddToCart} />
      </div>
      <div ref={topSellingRef}>
        <ProductSection title="TOP SELLING" products={topSelling} loading={loading} error={error} bordered initialCount={12} onAddToCart={handleAddToCart} />
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