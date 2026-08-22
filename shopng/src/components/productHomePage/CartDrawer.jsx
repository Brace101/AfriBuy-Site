import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartSubtotal, increaseQty, decreaseQty, removeItem } from '../../store/cartSlice';
import { selectIsAuthenticated } from '../../store/authSlice';
import { formatNaira } from '../../utils/currency';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleGoToCheckout = () => {
    onClose(); // Close the drawer
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout'); // Route to /checkout page
  };

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
                <p className="cart-item-price">{formatNaira(item.price)}</p>
                <div className="cart-qty-controls">
                  <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                </div>
              </div>
              <button className="cart-remove" onClick={() => dispatch(removeItem(item.id))}>✕</button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <button className="cart-checkout" onClick={handleGoToCheckout}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
