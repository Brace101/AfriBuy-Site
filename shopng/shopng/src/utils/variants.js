// Deterministic size/color options for the demo store. dummyjson doesn't return
// real variant data, so we derive believable options from the product id/category
// so the same product always shows the same choices.

const SIZE_SETS = [
  ['S', 'M', 'L', 'XL'],
  ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ['S', 'M', 'L'],
]

const COLOR_PALETTE = [
  { name: 'Black', hex: '#111111' },
  { name: 'Navy', hex: '#14213D' },
  { name: 'White', hex: '#F5F5F5' },
  { name: 'Beige', hex: '#D8C3A5' },
  { name: 'Red', hex: '#B91C1C' },
  { name: 'Olive', hex: '#556B2F' },
  { name: 'Grey', hex: '#8C8C8C' },
]

// Categories where showing a size/color picker makes sense. Everything else
// (electronics, groceries, furniture, etc.) skips variants entirely.
const APPAREL_CATEGORY_HINTS = [
  'shirt', 'dress', 'top', 'clothing', 'fashion', 'jean', 'jacket',
  'shoe', 'sneaker', 'wear', 'skirt', 'trouser', 'suit', 'coat',
]

export const productHasVariants = (category = '') => {
  const c = category.toLowerCase()
  return APPAREL_CATEGORY_HINTS.some((hint) => c.includes(hint))
}

const hashId = (id) => {
  const n = Number(id) || 0
  return n
}

export const getSizeOptions = (id) => SIZE_SETS[hashId(id) % SIZE_SETS.length]

export const getColorOptions = (id) => {
  const start = hashId(id) % COLOR_PALETTE.length
  const count = 3 + (hashId(id) % 3) // 3-5 colors
  const colors = []
  for (let i = 0; i < count; i++) {
    colors.push(COLOR_PALETTE[(start + i) % COLOR_PALETTE.length])
  }
  return colors
}
