import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [], // registered accounts: { id, fullName, email, phone, password }
  currentUser: null, // logged-in user (without password) or null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload
      state.users.push(newUser)
      const safeUser = { ...newUser }
      delete safeUser.password
      state.currentUser = safeUser
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
  },
})

export const { registerUser, loginUser, logout } = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser
export const selectIsAuthenticated = (state) => Boolean(state.auth.currentUser)
export const selectUserByEmail = (state, email) =>
  state.auth.users.find((u) => u.email.toLowerCase() === email.toLowerCase())

export default authSlice.reducer
