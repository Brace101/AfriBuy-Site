import React from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../../utils/useSeo'
import './notFound.css'

const NotFound = () => {
  useSeo({
    title: '404 - Page Not Found',
    description: 'The page you were looking for could not be found on AfriBuy.',
  })

  return (
    <div className="nf-page">
      <div className="nf-topbar">
        <Link to="/" className="nf-logo">
          <img src="/afribuy-logo-nav.svg" alt="AfriBuy" className="nf-logo-img" />
        </Link>
      </div>

      <div className="nf-content">
        <p className="nf-code">404</p>
        <h1 className="nf-title">Lost your way?</h1>
        <p className="nf-subtitle">
          We couldn't find the page you're looking for. It might have been moved,
          renamed, or never existed.
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-home-btn">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
