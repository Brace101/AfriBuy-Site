const STORAGE_KEY = 'afribuy_state'

export const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    // Corrupt or inaccessible storage (e.g. private browsing) — start fresh.
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const toPersist = JSON.stringify({ cart: state.cart, auth: state.auth })
    localStorage.setItem(STORAGE_KEY, toPersist)
  } catch {
    // Ignore write failures (storage full, disabled, etc).
  }
}
