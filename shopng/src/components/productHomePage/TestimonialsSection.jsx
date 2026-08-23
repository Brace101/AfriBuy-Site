import React from 'react'

const testimonials = [
  { id: 1, name: 'Sarah M.', rating: 5, text: "I'm blown away by the quality and style of the clothes I received from Shop.co." },
  { id: 2, name: 'Alex K.', rating: 5, text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.' },
  { id: 3, name: 'James L.', rating: 5, text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled." },
  { id: 4, name: 'Maya P.', rating: 5, text: 'Shop.co has become my go-to for building out a wardrobe I actually feel like myself in.' },
  { id: 5, name: 'David O.', rating: 5, text: 'Fast delivery and the quality is even better than the photos. Already ordered twice more.' },
  { id: 6, name: 'Grace A.', rating: 5, text: "Customer service was amazing when I needed to swap a size. Definitely my go-to store now." },
]

const TestimonialsSection = () => {
  const loopItems = [...testimonials, ...testimonials]

  return (
    <div className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title left">OUR HAPPY CUSTOMERS</h2>
      </div>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {loopItems.map((item, i) => (
            <div key={`${item.id}-${i}`} className="testimonial-card">
              <div className="rating">{'★'.repeat(item.rating)}</div>
              <h3 className="testimonial-name">{item.name} <span className="verified-badge">✓</span></h3>
              <p className="testimonial-text">"{item.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection