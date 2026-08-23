// Demo coupon codes. In a real store these would be validated server-side.
export const COUPONS = {
  WELCOME10: { type: 'percent', value: 10, description: '10% off your order' },
  SAVE5000: { type: 'flat', value: 5000, description: '₦5,000 off your order' },
  FREESHIP: { type: 'shipping', value: 0, description: 'Free shipping' },
}

/**
 * Resolves a coupon code against a subtotal, returning the discount amount
 * (in Naira) and whether shipping should be waived, or null if invalid.
 */
export const resolveCoupon = (code, subtotal) => {
  const coupon = COUPONS[code?.trim().toUpperCase()]
  if (!coupon) return null

  if (coupon.type === 'percent') {
    return { code: code.trim().toUpperCase(), discount: Math.round(subtotal * (coupon.value / 100)), freeShipping: false, description: coupon.description }
  }
  if (coupon.type === 'flat') {
    return { code: code.trim().toUpperCase(), discount: Math.min(coupon.value, subtotal), freeShipping: false, description: coupon.description }
  }
  if (coupon.type === 'shipping') {
    return { code: code.trim().toUpperCase(), discount: 0, freeShipping: true, description: coupon.description }
  }
  return null
}
