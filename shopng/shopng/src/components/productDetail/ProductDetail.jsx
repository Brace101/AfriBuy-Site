import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/cartSlice'
import { useToast } from '../common/useToast'
import { mapApiProduct } from '../../utils/mapApiProduct'
import { formatNaira } from '../../utils/currency'
import { Rating } from '../productHomePage/ProductCart'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showToast } = useToast()

  const [product, setProduct] = useState(null)
  const [raw, setRaw] = useState(null)
  const [related, setRelated] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setActiveImage(0)
    window.scrollTo({ top: 0, behavior: 'instant' })

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setRaw(data)
        setProduct(mapApiProduct(data))
        setLoading(false)
        return fetch(`https://dummyjson.com/products/category/${data.category}?limit=7`)
      })
      .then((res) => (res ? res.json() : null))
      .then((data) => {
        if (!data) return
        const items = (data.products || [])
          .filter((p) => String(p.id) !== String(id))
          .slice(0, 6)
          .map(mapApiProduct)
        setRelated(items)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    dispatch(addItem(product))
    showToast(`${product.name} added to cart`, { icon: '🛒' })
  }

  if (loading) {
    return (
      <div className="pd-status">
        <p>Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="pd-status">
        <p>{error || 'Product not found.'}</p>
        <Link to="/" className="pd-back-link">← Back to shop</Link>
      </div>
    )
  }

  const images = raw?.images?.length ? raw.images : [product.image]

  return (
    <div className="pd-page">
      <div className="pd-topbar">
        <Link to="/" className="pd-logo">AfriBuy</Link>
        <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        {raw?.category && (
          <>
            <span>/</span>
            <span className="pd-breadcrumb-current">{raw.category}</span>
          </>
        )}
      </div>

      <div className="pd-main">
        <div className="pd-left">
          <div className="pd-gallery">
            <div className="pd-main-image">
              {product.discount && <span className="discount-tag pd-discount-tag">-{product.discount}%</span>}
              <img src={images[activeImage]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs">
                {images.slice(0, 6).map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-card">
            <h3 className="pd-card-title">Product details</h3>
            <p className="pd-description">{raw?.description}</p>
            {raw?.tags?.length > 0 && (
              <ul className="pd-bullet-list">
                {raw.tags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="pd-card">
            <h3 className="pd-card-title">Specifications</h3>
            <div className="pd-specs-grid">
              <div className="pd-specs-col">
                <h4>Key Features</h4>
                <ul className="pd-bullet-list">
                  {raw?.brand && <li>Brand: {raw.brand}</li>}
                  {raw?.warrantyInformation && <li>{raw.warrantyInformation}</li>}
                  {raw?.shippingInformation && <li>{raw.shippingInformation}</li>}
                  {raw?.returnPolicy && <li>{raw.returnPolicy}</li>}
                </ul>
              </div>
              <div className="pd-specs-col">
                <h4>Specifications</h4>
                <ul className="pd-specs-list">
                  {raw?.sku && <li><span>SKU:</span> {raw.sku}</li>}
                  {raw?.category && <li><span>Category:</span> {raw.category}</li>}
                  {raw?.weight && <li><span>Weight:</span> {raw.weight} kg</li>}
                  {raw?.minimumOrderQuantity && (
                    <li><span>Min. Order Qty:</span> {raw.minimumOrderQuantity}</li>
                  )}
                  {typeof raw?.stock === 'number' && (
                    <li><span>Stock:</span> {raw.stock} available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-right">
          <div className="pd-buybox">
            <h1 className="pd-title">{product.name}</h1>
            <Rating value={product.rating} />

            <div className="pd-price-row">
              <span className="pd-price">{formatNaira(product.price)}</span>
              {product.originalPrice && (
                <span className="pd-original-price">{formatNaira(product.originalPrice)}</span>
              )}
              {product.discount && <span className="discount-tag pd-inline-tag">-{product.discount}%</span>}
            </div>

            <button className="pd-add-to-cart" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>

            <div className="pd-buybox-note">
              Questions about this product?{' '}
              <button className="pd-chat-link" onClick={() => showToast('Chat support coming soon', { icon: '💬' })}>
                Chat with us
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pd-related">
          <h2 className="pd-related-title">Customers who viewed this also viewed</h2>
          <div className="pd-related-grid">
            {related.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="pd-related-card">
                <div className="pd-related-image">
                  {item.discount && <span className="discount-tag pd-discount-tag">-{item.discount}%</span>}
                  <img src={item.image} alt={item.name} />
                </div>
                <h4 className="pd-related-name">{item.name}</h4>
                <div className="price-row">
                  <span className="price">{formatNaira(item.price)}</span>
                  {item.originalPrice && (
                    <span className="original-price">{formatNaira(item.originalPrice)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
