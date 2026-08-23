// Deterministic stock simulation for the demo store. dummyjson stock numbers
// aren't consistent with our own product IDs, so we derive a believable
// quantity from the product id — the same product always shows the same
// stock level rather than a random one that changes on every render.

const LOW_STOCK_THRESHOLD = 5

const hash = (id) => {
  const n = Number(id) || 0
  return n
}

// Returns an integer stock count. A handful of products (every 17th id)
// are deliberately out of stock so the "sold out" state is reachable.
export const getStockForProduct = (id) => {
  const n = hash(id)
  if (n % 17 === 0) return 0
  // Spread stock between 1 and 40, skewed so low-stock states are common
  // enough to notice but not on every card.
  return ((n * 7) % 40) + 1
}

export const isOutOfStock = (id) => getStockForProduct(id) === 0
export const isLowStock = (id) => {
  const stock = getStockForProduct(id)
  return stock > 0 && stock <= LOW_STOCK_THRESHOLD
}

export { LOW_STOCK_THRESHOLD }
