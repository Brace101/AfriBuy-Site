import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Keyed by productId -> array of { id, productId, userEmail, userName, rating, title, comment, photos, createdAt }
  reviewsByProduct: {},
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const review = action.payload
      const key = String(review.productId)
      if (!state.reviewsByProduct[key]) state.reviewsByProduct[key] = []
      state.reviewsByProduct[key].unshift(review)
    },
    removeReview: (state, action) => {
      const { productId, reviewId } = action.payload
      const key = String(productId)
      if (!state.reviewsByProduct[key]) return
      state.reviewsByProduct[key] = state.reviewsByProduct[key].filter((r) => r.id !== reviewId)
    },
  },
})

export const { addReview, removeReview } = reviewsSlice.actions

// Selectors
export const selectReviewsForProduct = (state, productId) =>
  state.reviews.reviewsByProduct[String(productId)] || []

export const selectReviewCountForProduct = (state, productId) =>
  selectReviewsForProduct(state, productId).length

export const selectAverageRatingForProduct = (state, productId) => {
  const reviews = selectReviewsForProduct(state, productId)
  if (reviews.length === 0) return null
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / reviews.length) * 10) / 10
}

export default reviewsSlice.reducer
