export const mapApiProduct = (product) => {
  const hasDiscount = product.id % 2 === 0
  const discount = hasDiscount ? (product.id % 3 === 0 ? 30 : 20) : undefined
  const originalPrice = hasDiscount
    ? +(product.price / (1 - discount / 100)).toFixed(2)
    : undefined

  return {
    id: product.id,
    name: product.title ?? 'Product',
    image: product.image,
    rating: product.rating?.rate ?? 0,
    price: product.price,
    ...(hasDiscount && { originalPrice, discount }),
  }
}