import React, { useState } from 'react';
import './checkout.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment integration or navigation here
    console.log('Order submitted:', formData);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Shipping / Customer Details */}
        <div className="checkout-form-section">
          <h1 className="checkout-heading">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <h2 className="checkout-section-title">Shipping Information</h2>
            
            <div className="checkout-input-group">
              <div>
                <label className="checkout-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
              </div>
              <div>
                <label className="checkout-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="checkout-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="checkout-input"
                required
              />
            </div>

            <div className="mb-4">
              <label className="checkout-label">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="checkout-input"
                required
              />
            </div>

            <div className="checkout-input-group">
              <div>
                <label className="checkout-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
              </div>
              <div>
                <label className="checkout-label">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="checkout-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="checkout-pay-btn">
              Complete Order
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary-section">
          <h2 className="checkout-section-title">Order Summary</h2>
          <div className="checkout-summary-item">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold text-gray-900">$120.00</span>
          </div>
          <div className="checkout-summary-item">
            <span className="text-gray-600">Shipping</span>
            <span className="font-bold text-gray-900">Free</span>
          </div>
          <div className="checkout-summary-item border-none text-base font-black pt-4">
            <span>Total</span>
            <span className="text-[var(--color-brand-primary)]">$120.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}