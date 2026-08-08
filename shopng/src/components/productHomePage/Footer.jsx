import React from 'react'

const footerLinks = {
  Company: ['About', 'Features', 'Works', 'Career'],
  Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  Resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>AfriBuy</h2>
          <p>We have clothes that suits your style and which you're proud to wear.</p>
        </div>
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="footer-column">
            <h3>{category.toUpperCase()}</h3>
            <ul>
              {links.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer