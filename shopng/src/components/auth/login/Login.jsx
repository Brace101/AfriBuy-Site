import React, { useState } from 'react'
import './login.css'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [rememberMe, setRememberMe] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.email.trim()) newErrors.email = 'Email is required.'
        else if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address.'
        if (!formData.password) newErrors.password = 'Password is required.'
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
        console.log('Logging in:', { ...formData, rememberMe })
    }

    return (
        <div className="login-page">

            {/* Left branded panel — hidden on small screens, shown from md breakpoint up */}
            <div className="login-left-panel">
                <div className="login-left-bg">
                    <img src="/models.png" alt="Models wearing denim jackets" />
                </div>
                <div className="login-left-gradient" />

                <h1 className="login-left-logo">AfriBuy</h1>

                <div className="login-left-content">
                    <h2 className="login-left-heading">WELCOME<br/>BACK</h2>
                    <p className="login-left-text">
                        Log in to pick up where you left off — track orders, revisit your wishlist, and keep shopping your style.
                    </p>
                    <div className="login-stats">
                        <div>
                            <p className="login-stat-value">200+</p>
                            <p className="login-stat-label">Brands</p>
                        </div>
                        <div>
                            <p className="login-stat-value">30,000+</p>
                            <p className="login-stat-label">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="login-right-panel">
                <div className="login-form-wrap">
                    <h1 className="login-mobile-logo">SHOP.CO</h1>

                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">
                        Log in to continue shopping and pick up right where you left off.
                    </p>

                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        <div>
                            <label htmlFor="email" className="login-label">
                                Email Address
                            </label>
                            <div className="login-input-wrap">
                                <span className="login-input-icon">✉</span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`login-input ${errors.email ? 'error' : ''}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="login-error">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="login-label">
                                Password
                            </label>
                            <div className="login-input-wrap">
                                <span className="login-input-icon">🔒</span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`login-input ${errors.password ? 'error' : ''}`}
                                />
                            </div>
                            {errors.password && (
                                <p className="login-error">{errors.password}</p>
                            )}
                        </div>

                        <div className="login-options-row">
                            <label className="login-remember">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <a href="/forgot-password" className="login-forgot">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="login-submit">
                            Log In
                        </button>
                    </form>

                    <p className="login-footer">
                        Don't have an account?{' '}
                        <a href="/signup">Sign Up</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login