import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReview, selectReviewsForProduct, selectAverageRatingForProduct } from '../../store/reviewsSlice'
import { selectCurrentUser } from '../../store/authSlice'
import { useToast } from '../common/useToast'

const MAX_PHOTOS = 3

// A clickable 1-5 star input used when writing a review.
const StarInput = ({ value, onChange }) => (
  <div className="review-star-input" role="radiogroup" aria-label="Rating">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        role="radio"
        aria-checked={value === n}
        className={`review-star-input-btn ${n <= value ? 'filled' : ''}`}
        onClick={() => onChange(n)}
      >
        ★
      </button>
    ))}
  </div>
)

const formatReviewDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const Reviews = ({ productId }) => {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const currentUser = useSelector(selectCurrentUser)
  const reviews = useSelector((state) => selectReviewsForProduct(state, productId))
  const avgReviewRating = useSelector((state) => selectAverageRatingForProduct(state, productId))

  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState('')

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_PHOTOS)
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
    )
    Promise.all(readers).then(setPhotos)
  }

  const resetForm = () => {
    setRating(0)
    setTitle('')
    setComment('')
    setPhotos([])
    setError('')
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    if (!comment.trim()) {
      setError('Please write a few words about your experience.')
      return
    }

    dispatch(
      addReview({
        id: `rev-${Date.now()}`,
        productId,
        userEmail: currentUser?.email || 'guest',
        userName: currentUser?.fullName?.split(' ')[0] || 'Guest Shopper',
        rating,
        title: title.trim(),
        comment: comment.trim(),
        photos,
        createdAt: new Date().toISOString(),
      })
    )
    showToast('Thanks for your review!', { icon: '⭐' })
    resetForm()
  }

  return (
    <div className="pd-card">
      <div className="pd-reviews-header">
        <div>
          <h3 className="pd-card-title">Customer Reviews</h3>
          {reviews.length > 0 ? (
            <p className="pd-reviews-summary">
              ⭐ {avgReviewRating} average · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          ) : (
            <p className="pd-reviews-summary">No reviews yet — be the first to share your thoughts.</p>
          )}
        </div>
        <button
          type="button"
          className="pd-write-review-btn"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="review-form-field">
            <label>Your Rating</label>
            <StarInput value={rating} onChange={setRating} />
          </div>

          <div className="review-form-field">
            <label htmlFor="review-title">Title (optional)</label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum it up in a few words"
              className="review-form-input"
            />
          </div>

          <div className="review-form-field">
            <label htmlFor="review-comment">Review</label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              className="review-form-textarea"
              rows={4}
            />
          </div>

          <div className="review-form-field">
            <label htmlFor="review-photos">Add photos (optional, up to {MAX_PHOTOS})</label>
            <input
              id="review-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="review-form-file"
            />
            {photos.length > 0 && (
              <div className="review-form-photo-preview">
                {photos.map((src, i) => (
                  <img key={i} src={src} alt={`Upload preview ${i + 1}`} />
                ))}
              </div>
            )}
          </div>

          {error && <p className="review-form-error">{error}</p>}

          <button type="submit" className="review-form-submit">Submit Review</button>
        </form>
      )}

      {reviews.length > 0 && (
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-item-header">
                <div className="review-item-stars">
                  {'★'.repeat(review.rating)}
                  <span className="review-item-stars-empty">{'★'.repeat(5 - review.rating)}</span>
                </div>
                <span className="review-item-date">{formatReviewDate(review.createdAt)}</span>
              </div>
              {review.title && <p className="review-item-title">{review.title}</p>}
              <p className="review-item-author">{review.userName}</p>
              <p className="review-item-comment">{review.comment}</p>
              {review.photos?.length > 0 && (
                <div className="review-item-photos">
                  {review.photos.map((src, i) => (
                    <img key={i} src={src} alt={`${review.userName} review photo ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
