import React, { useState } from 'react'

const testimonials = [
  { id: 1, name: 'Sarah M.', rating: 5, text: "I'm blown away by the quality and style of the clothes I received from Shop.co." },
  { id: 2, name: 'Alex K.', rating: 5, text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.' },
  { id: 3, name: 'James L.', rating: 5, text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled." },
  { id: 4, name: 'Maya P.', rating: 5, text: 'Shop.co has become my go-to for building out a wardrobe I actually feel like myself in.' },
]

const TestimonialsSection = () => {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  const canGoPrev = startIndex > 0
  const canGoNext = startIndex + visibleCount < testimonials.length

  return (
    <div className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title left">OUR HAPPY CUSTOMERS</h2>
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={() => canGoPrev && setStartIndex(startIndex - 1)} disabled={!canGoPrev}>←</button>
          <button className="carousel-btn" onClick={() => canGoNext && setStartIndex(startIndex + 1)} disabled={!canGoNext}>→</button>
        </div>
      </div>
      <div className="testimonials-grid">
        {testimonials.slice(startIndex, startIndex + visibleCount).map((item) => (
          <div key={item.id} className="testimonial-card">
            <div className="rating">{'★'.repeat(item.rating)}</div>
            <h3 className="testimonial-name">{item.name} <span className="verified-badge">✓</span></h3>
            <p className="testimonial-text">"{item.text}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection