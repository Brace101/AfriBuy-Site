import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import './login.css'
import { loginUser } from '../../../store/authSlice'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const users = useSelector((state) => state.auth.users)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [rememberMe, setRememberMe] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

        setSubmitting(true)

        // Simulate a brief network call so the flow feels real.
        setTimeout(() => {
            const match = users.find(
                (u) =>
                    u.email.toLowerCase() === formData.email.trim().toLowerCase() &&
                    u.password === formData.password
            )

            if (!match) {
                setErrors({ password: 'Incorrect email or password. Please try again.' })
                setSubmitting(false)
                return
            }

            const safeUser = { ...match }
            delete safeUser.password
            dispatch(loginUser(safeUser))
            setSubmitting(false)

            const redirectTo = location.state?.from || '/'
            navigate(redirectTo, { replace: true })
        }, 400)
    }

    return (
        <div className="login-page">

            {/* Left branded panel — hidden on small screens, shown from md breakpoint up */}
            <div className="login-left-panel">
                <div className="login-left-bg">
                    <img src="/models.png" alt="Models wearing denim jackets" />
                </div>
                <div className="login-left-gradient" />

                <Link to="/" className="login-left-logo">AfriBuy</Link>

                <div className="login-left-content">
                    <h2 className="login-left-heading">WELCOME<br/>BACK</h2>
                    <p className="login-left-text">
                        Log in to pick up where you left off — track orders and keep shopping your style.
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
                    <Link to="/" className="login-mobile-logo">AfriBuy</Link>

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
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`login-input login-input-has-toggle ${errors.password ? 'error' : ''}`}
                                />
                                <button
                                    type="button"
                                    className="login-toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    tabIndex={-1}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
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
                            <span
                                className="login-forgot"
                                role="button"
                                tabIndex={0}
                                onClick={() => alert('Password reset isn\'t available in this demo yet. Please sign in with your existing details.')}
                            >
                                Forgot password?
                            </span>
                        </div>

                        <button type="submit" className="login-submit" disabled={submitting}>
                            {submitting ? 'Logging in…' : 'Log In'}
                        </button>
                    </form>

                    <p className="login-footer">
                        Don't have an account?{' '}
                        <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login