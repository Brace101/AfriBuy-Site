import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/authSlice'
import { selectOrdersByUser } from '../../store/ordersSlice'
import { formatNaira } from '../../utils/currency'
import { useSeo } from '../../utils/useSeo'
import './myOrders.css'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const MyOrders = () => {
  useSeo({ title: 'My Orders', description: 'View your past AfriBuy orders and track their status.' })

  const currentUser = useSelector(selectCurrentUser)
  const orders = useSelector((state) =>
    currentUser ? selectOrdersByUser(state, currentUser.email) : []
  )
  const [expandedId, setExpandedId] = useState(null)

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: '/orders' }} replace />
  }

  return (
    <div className="mo-page">
      <div className="mo-topbar">
        <Link to="/" className="mo-logo">
          <img src="/afribuy-logo-nav.svg" alt="AfriBuy" className="mo-logo-img" />
        </Link>
        <Link to="/" className="mo-back">← Continue Shopping</Link>
      </div>

      <div className="mo-header">
        <h1>My Orders</h1>
        <p>{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="mo-empty">
          <span className="mo-empty-icon">📦</span>
          <h2>No orders yet</h2>
          <p>Once you place an order, you'll be able to track it here.</p>
          <Link to="/" className="mo-empty-cta">Start Shopping</Link>
        </div>
      ) : (
        <div className="mo-list">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id
            return (
              <div key={order.id} className="mo-card">
                <button
                  className="mo-card-summary"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="mo-card-summary-main">
                    <p className="mo-order-id">Order {order.id}</p>
                    <p className="mo-order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="mo-card-summary-meta">
                    <span className={`mo-status mo-status-${order.status}`}>{order.status}</span>
                    <span className="mo-order-total">{formatNaira(order.total)}</span>
                    <span className="mo-chevron">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mo-card-detail">
                    <div className="mo-detail-items">
                      {order.items.map((item) => {
                        const lineKey = item.variantKey || item.id
                        return (
                          <div key={lineKey} className="mo-detail-item">
                            <img src={item.image} alt={item.name} />
                            <div className="mo-detail-item-info">
                              <p className="mo-detail-item-name">{item.name}</p>
                              {(item.size || item.color) && (
                                <p className="mo-detail-item-variant">
                                  {item.color && `Color: ${item.color}`}
                                  {item.size && item.color && ' · '}
                                  {item.size && `Size: ${item.size}`}
                                </p>
                              )}
                              <p className="mo-detail-item-qty">Qty: {item.quantity}</p>
                            </div>
                            <p className="mo-detail-item-price">{formatNaira(item.price * item.quantity)}</p>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mo-detail-totals">
                      <div className="mo-detail-total-row">
                        <span>Subtotal</span>
                        <span>{formatNaira(order.subtotal)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="mo-detail-total-row mo-detail-discount">
                          <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                          <span>-{formatNaira(order.discount)}</span>
                        </div>
                      )}
                      <div className="mo-detail-total-row">
                        <span>Shipping</span>
                        <span>{order.shipping === 0 ? 'Free' : formatNaira(order.shipping)}</span>
                      </div>
                      <div className="mo-detail-total-row mo-detail-final">
                        <span>Total</span>
                        <span>{formatNaira(order.total)}</span>
                      </div>
                    </div>

                    <div className="mo-detail-address">
                      <p className="mo-detail-label">Shipped To</p>
                      <p>
                        {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                        {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}<br />
                        {order.shippingInfo.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyOrders
