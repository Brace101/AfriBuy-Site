import { convertUsdToNgn } from './currency'

export const mapApiProduct = (product) => {
  const hasDiscount = product.id % 2 === 0
  const discount = hasDiscount ? (product.id % 3 === 0 ? 30 : 20) : undefined

  const priceNgn = convertUsdToNgn(product.price)
  const originalPriceNgn = hasDiscount
    ? Math.round(priceNgn / (1 - discount / 100))
    : undefined

  // Supports both fakestoreapi (image, rating.rate) and dummyjson
  // (thumbnail, rating as a plain number) shapes.
  const image = product.thumbnail ?? product.image
  const rating = typeof product.rating === 'number' ? product.rating : product.rating?.rate ?? 0

  return {
    id: product.id,
    name: product.title ?? 'Product',
    image,
    rating: Math.round(rating * 10) / 10,
    price: priceNgn,
    ...(hasDiscount && { originalPrice: originalPriceNgn, discount }),
  }
}
