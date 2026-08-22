import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './checkout.css';
import { selectCartItems, selectCartSubtotal, clearCart } from '../../store/cartSlice';
import { selectCurrentUser } from '../../store/authSlice';
import { addOrder } from '../../store/ordersSlice';

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const FREE_SHIPPING_THRESHOLD = 100;
const FLAT_SHIPPING_FEE = 7.5;

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const [nameParts] = useState(() => {
    const full = currentUser?.fullName?.trim().split(' ') ?? [];
    return { first: full[0] ?? '', last: full.slice(1).join(' ') ?? '' };
  });

  const [formData, setFormData] = useState({
    firstName: nameParts.first,
    lastName: nameParts.last,
    email: currentUser?.email ?? '',
    phone: currentUser?.phone ?? '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Require login before checkout — bounce back with a return path.
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  const shipping = cartItems.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.address.trim()) newErrors.address = 'Street address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order processing / payment confirmation delay.
    setTimeout(() => {
      const order = {
        id: `AB-${Date.now().toString().slice(-8)}`,
        userEmail: currentUser.email,
        items: cartItems,
        subtotal,
        shipping,
        total,
        paymentMethod,
        shippingInfo: { ...formData },
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      setIsPlacingOrder(false);
      navigate('/order-confirmation', { state: { order } });
    }, 900);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty-state">
          <h1 className="checkout-heading">Your cart is empty</h1>
          <p>Add a few items to your cart before heading to checkout.</p>
          <Link to="/" className="checkout-pay-btn checkout-empty-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-topbar">
        <Link to="/" className="checkout-logo">AfriBuy</Link>
        <Link to="/" className="checkout-back-link">← Continue Shopping</Link>
      </div>

      <div className="checkout-container">
        {/* Shipping / Customer Details */}
        <div className="checkout-form-section">
          <h1 className="checkout-heading">Checkout</h1>

          <form onSubmit={handleSubmit} noValidate>
            <h2 className="checkout-section-title">Shipping Information</h2>

            <div className="checkout-input-group">
              <div>
                <label className="checkout-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`checkout-input ${errors.firstName ? 'checkout-input-error' : ''}`}
                />
                {errors.firstName && <p className="checkout-error">{errors.firstName}</p>}
              </div>
              <div>
                <label className="checkout-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`checkout-input ${errors.lastName ? 'checkout-input-error' : ''}`}
                />
                {errors.lastName && <p className="checkout-error">{errors.lastName}</p>}
              </div>
            </div>

            <div className="checkout-input-group">
              <div>
                <label className="checkout-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`checkout-input ${errors.email ? 'checkout-input-error' : ''}`}
                />
                {errors.email && <p className="checkout-error">{errors.email}</p>}
              </div>
              <div>
                <label className="checkout-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`checkout-input ${errors.phone ? 'checkout-input-error' : ''}`}
                />
                {errors.phone && <p className="checkout-error">{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="checkout-label">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`checkout-input ${errors.address ? 'checkout-input-error' : ''}`}
              />
              {errors.address && <p className="checkout-error">{errors.address}</p>}
            </div>

            <div className="checkout-input-group">
              <div>
                <label className="checkout-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`checkout-input ${errors.city ? 'checkout-input-error' : ''}`}
                />
                {errors.city && <p className="checkout-error">{errors.city}</p>}
              </div>
              <div>
                <label className="checkout-label">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`checkout-input ${errors.postalCode ? 'checkout-input-error' : ''}`}
                />
                {errors.postalCode && <p className="checkout-error">{errors.postalCode}</p>}
              </div>
            </div>

            <h2 className="checkout-section-title">Payment Method</h2>
            <div className="checkout-payment-options">
              <label className={`checkout-payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span>💳 Pay with Card</span>
              </label>
              <label className={`checkout-payment-option ${paymentMethod === 'delivery' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="delivery"
                  checked={paymentMethod === 'delivery'}
                  onChange={() => setPaymentMethod('delivery')}
                />
                <span>🚚 Pay on Delivery</span>
              </label>
            </div>

            <button type="submit" className="checkout-pay-btn" disabled={isPlacingOrder}>
              {isPlacingOrder ? 'Placing Order…' : `Complete Order — $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary-section">
          <h2 className="checkout-section-title">Order Summary</h2>

          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-summary-product">
                <div className="checkout-summary-product-image">
                  <img src={item.image} alt={item.name} />
                  <span className="checkout-summary-qty-badge">{item.quantity}</span>
                </div>
                <div className="checkout-summary-product-info">
                  <p className="checkout-summary-product-name">{item.name}</p>
                  <p className="checkout-summary-product-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary-item">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-item">
            <span className="text-gray-600">Shipping</span>
            <span className="font-bold text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="checkout-shipping-note">
              Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more to unlock free shipping.
            </p>
          )}
          <div className="checkout-summary-item border-none text-base font-black pt-4">
            <span>Total</span>
            <span className="text-[var(--color-brand-primary)]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
