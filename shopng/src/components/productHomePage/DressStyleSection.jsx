import React from 'react'

const dressStyles = [
  { id: 1, name: 'Casual', image: 'https://images.pexels.com/photos/7764014/pexels-photo-7764014.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' },
  { id: 2, name: 'Formal', image: 'https://images.pexels.com/photos/7163352/pexels-photo-7163352.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' },
  { id: 3, name: 'Party', image: 'https://images.pexels.com/photos/9775888/pexels-photo-9775888.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' },
  { id: 4, name: 'Gym', image: 'https://images.pexels.com/photos/7389036/pexels-photo-7389036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' },
]

const DressStyleSection = () => {
  return (
    <div className="dress-style-section">
      <div className="dress-style-panel">
        <h2 className="section-title">BROWSE BY DRESS STYLE</h2>
        <div className="style-grid">
          {dressStyles.map((style) => (
            <div key={style.id} className="style-card">
              <h3 className="style-name">{style.name}</h3>
              <img src={style.image} alt={style.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DressStyleSection