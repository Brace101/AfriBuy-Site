import { convertUsdToNgn } from './currency'

export const mapApiProduct = (product) => {
  const hasDiscount = product.id % 2 === 0
  const discount = hasDiscount ? (product.id % 3 === 0 ? 30 : 20) : undefined

  const priceNgn = convertUsdToNgn(product.price)
  const originalPriceNgn = hasDiscount
    ? Math.round(priceNgn / (1 - discount / 100))
    : undefined

  return {
    id: product.id,
    name: product.title ?? 'Product',
    image: product.image,
    rating: product.rating?.rate ?? 0,
    price: priceNgn,
    ...(hasDiscount && { originalPrice: originalPriceNgn, discount }),
  }
}
