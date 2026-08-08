import React, { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCart'
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

const Product = () => {
  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFlyerVisible, setIsFlyerVisible] = useState(true)

  const newArrivalsRef = useRef(null)
  const topSellingRef = useRef(null)
  const brandsRef = useRef(null)
  const newsletterRef = useRef(null)

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const handleIncrease = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const handleDecrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

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
      {isFlyerVisible && (
        <div className="flyer">
          <div className="signup">
            Sign up and get 20% off your first order.{' '}
            <Link to="/signup">Sign Up Now</Link>
          </div>
          <div className="close" onClick={() => setIsFlyerVisible(false)}>X</div>
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
          <Link to="/signup" className="text-xl">👤</Link>
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE</h1>
          <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <button className="shop-now">Shop Now</button>

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
        <span>Calvin Klein</span>
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
        cartItems={cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Product