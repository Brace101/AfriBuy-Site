import React, { useState } from 'react'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  const handleSubscribe = () => {
    if (!email.trim() || !isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('success')
    setMessage("You're subscribed! Check your inbox for confirmation.")
    setEmail('')
  }

  return (
    <div className="newsletter">
      <h2 className="newsletter-title">STAY UPTO DATE ABOUT<br/>OUR LATEST OFFERS</h2>
      <div className="newsletter-form">
        <div className="newsletter-input-wrap">
          <span className="mail-icon">✉</span>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status) setStatus(null)
            }}
          />
        </div>
        <button className="subscribe-btn" onClick={handleSubscribe} disabled={!email.trim()}>
          Subscribe to Newsletter
        </button>
        {status && <p className={`newsletter-message ${status}`}>{message}</p>}
      </div>
    </div>
  )
}

export default Newsletter