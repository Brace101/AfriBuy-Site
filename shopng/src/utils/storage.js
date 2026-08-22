const STORAGE_KEY = 'afribuy_state_v1'

export const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch (err) {
    console.warn('Could not load saved state:', err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (err) {
    console.warn('Could not save state:', err)
  }
}
