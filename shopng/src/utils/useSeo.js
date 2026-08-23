import { useEffect } from 'react'

const DEFAULT_TITLE = 'AfriBuy — Find Clothes That Match Your Style'
const DEFAULT_DESCRIPTION =
  'Shop the latest fashion at AfriBuy. Browse thousands of high-quality products from 200+ international brands, with fast delivery across Nigeria.'

const setMetaTag = (name, content) => {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Sets the document title and meta description for the current route.
 * Falls back to sensible AfriBuy-wide defaults when a page doesn't override them.
 */
export const useSeo = ({ title, description } = {}) => {
  useEffect(() => {
    document.title = title ? `${title} | AfriBuy` : DEFAULT_TITLE
    setMetaTag('description', description || DEFAULT_DESCRIPTION)
  }, [title, description])
}

export default useSeo
