import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import './orderConfirmation.css'

const OrderConfirmation = () => {
  const location = useLocation()
  const order = location.state?.order

  // If someone lands here directly without an order in state, send them home.
  if (!order) {
    return <Navigate to="/" replace />
  }

  const estimatedDelivery = new Date(
    new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000
  ).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1 className="confirmation-title">Order Placed Successfully!</h1>
        <p className="confirmation-subtitle">
          Thank you for shopping with AfriBuy. A confirmation email is on its way to{' '}
          <strong>{order.shippingInfo.email}</strong>.
        </p>

        <div className="confirmation-meta">
          <div>
            <span className="confirmation-meta-label">Order Number</span>
            <span className="confirmation-meta-value">{order.id}</span>
          </div>
          <div>
            <span className="confirmation-meta-label">Payment Method</span>
            <span className="confirmation-meta-value">
              {order.paymentMethod === 'card' ? 'Card Payment' : 'Pay on Delivery'}
            </span>
          </div>
          <div>
            <span className="confirmation-meta-label">Estimated Delivery</span>
            <span className="confirmation-meta-value">{estimatedDelivery}</span>
          </div>
        </div>

        <div className="confirmation-items">
          {order.items.map((item) => (
            <div key={item.id} className="confirmation-item">
              <img src={item.image} alt={item.name} />
              <div className="confirmation-item-info">
                <p className="confirmation-item-name">{item.name}</p>
                <p className="confirmation-item-qty">Qty: {item.quantity}</p>
              </div>
              <p className="confirmation-item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="confirmation-totals">
          <div className="confirmation-total-row">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="confirmation-total-row">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="confirmation-total-row confirmation-total-final">
            <span>Total Paid</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="confirmation-address">
          <span className="confirmation-meta-label">Shipping To</span>
          <p>
            {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
            {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}<br />
            {order.shippingInfo.phone}
          </p>
        </div>

        <Link to="/" className="confirmation-continue-btn">Continue Shopping</Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
