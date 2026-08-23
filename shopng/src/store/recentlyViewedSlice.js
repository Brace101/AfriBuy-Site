import { createSlice } from '@reduxjs/toolkit'

const MAX_RECENTLY_VIEWED = 12

const initialState = {
  items: [], // most-recent-first array of lightweight product snapshots
}

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addRecentlyViewed: (state, action) => {
      const product = action.payload
      if (!product?.id) return
      state.items = state.items.filter((item) => item.id !== product.id)
      state.items.unshift(product)
      if (state.items.length > MAX_RECENTLY_VIEWED) {
        state.items = state.items.slice(0, MAX_RECENTLY_VIEWED)
      }
    },
    clearRecentlyViewed: (state) => {
      state.items = []
    },
  },
})

export const { addRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions

// Selectors
export const selectRecentlyViewed = (state) => state.recentlyViewed.items
export const selectRecentlyViewedExcluding = (state, excludeId) =>
  state.recentlyViewed.items.filter((item) => String(item.id) !== String(excludeId))

export default recentlyViewedSlice.reducer
