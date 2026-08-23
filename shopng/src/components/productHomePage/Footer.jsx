import React from 'react'

const footerLinks = {
  Company: ['About', 'Features', 'Works', 'Career'],
  Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  Resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
}

const socialLinks = [
  { name: 'X', icon: 'x-icon', href: '#' },
  { name: 'Instagram', icon: 'instagram-icon', href: '#' },
  { name: 'Discord', icon: 'discord-icon', href: '#' },
  { name: 'WhatsApp', icon: 'whatsapp-icon', href: '#' },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>AfriBuy</h2>
          <p>We have clothes that suits your style and which you're proud to wear.</p>
          <div className="social-icons">
            {socialLinks.map(({ name, icon, href }) => (
              <a key={name} href={href} aria-label={name} className="social-icon-link">
                <svg width="16" height="16" aria-hidden="true">
                  <use href={`/icons.svg#${icon}`} />
                </svg>
              </a>
            ))}
          </div>
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