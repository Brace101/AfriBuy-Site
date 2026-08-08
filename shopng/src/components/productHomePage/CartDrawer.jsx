import React from 'react'

const CartDrawer = ({ isOpen, onClose, cartItems = [], onIncrease, onDecrease, onRemove }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 && <p className="cart-empty">Your cart is empty.</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-qty-controls">
                  <button onClick={() => onDecrease(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
                </div>
              </div>
              <button className="cart-remove" onClick={() => onRemove(item.id)}>✕</button>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="cart-checkout">Go to Checkout</button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer