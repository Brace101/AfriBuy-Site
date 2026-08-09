import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.'
        if (!formData.email.trim()) newErrors.email = 'Email is required.'
        else if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address.'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.'
        if (!formData.password) newErrors.password = 'Password is required.'
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Swap this for a real API call to your backend when ready.
        console.log('Signing up:', formData)
    }

    return (
        <div className="signup-page">

            {/* Left branded panel — hidden on small screens, shown from md breakpoint up */}
            <div className="signup-left-panel">
                <div className="signup-left-bg">
                    <img src="/models.png" alt="Models wearing denim jackets" />
                </div>
                <div className="signup-left-gradient" />

                <h1 className="signup-left-logo">AfriBuy</h1>

                <div className="signup-left-content">
                    <h2 className="signup-left-heading">JOIN THE<br/>MOVEMENT</h2>
                    <p className="signup-left-text">
                        Create an account and unlock 20% off your first order, early access to drops, and style picks made for you.
                    </p>
                    <div className="signup-stats">
                        <div>
                            <p className="signup-stat-value">200+</p>
                            <p className="signup-stat-label">Brands</p>
                        </div>
                        <div>
                            <p className="signup-stat-value">30,000+</p>
                            <p className="signup-stat-label">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="signup-right-panel">
                <div className="signup-form-wrap">
                    <h1 className="signup-mobile-logo">AfriBuy</h1>

                    <h2 className="signup-title">Create an Account</h2>
                    <p className="signup-subtitle">
                        Sign up now and get <span className="signup-highlight">20% off</span> your first order.
                    </p>

                    <form onSubmit={handleSubmit} className="signup-form" noValidate>
                        <div>
                            <label htmlFor="fullName" className="signup-label">
                                Full Name
                            </label>
                            <div className="signup-input-wrap">
                                <span className="signup-input-icon">👤</span>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`signup-input ${errors.fullName ? 'error' : ''}`}
                                />
                            </div>
                            {errors.fullName && (
                                <p className="signup-error">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="signup-label">
                                Email Address
                            </label>
                            <div className="signup-input-wrap">
                                <span className="signup-input-icon">✉</span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`signup-input ${errors.email ? 'error' : ''}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="signup-error">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="signup-label">
                                Phone Number
                            </label>
                            <div className="signup-input-wrap">
                                <span className="signup-input-icon">📱</span>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+234 800 000 0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`signup-input ${errors.phone ? 'error' : ''}`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="signup-error">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="signup-label">
                                Password
                            </label>
                            <div className="signup-input-wrap">
                                <span className="signup-input-icon">🔒</span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`signup-input ${errors.password ? 'error' : ''}`}
                                />
                            </div>
                            {errors.password && (
                                <p className="signup-error">{errors.password}</p>
                            )}
                        </div>

                        <button type="submit" className="signup-submit">
                            Sign Up
                        </button>
                    </form>

                    <p className="signup-footer">
                        Already have an account?{' '}
                        <a href="/login">Log In</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SignUp