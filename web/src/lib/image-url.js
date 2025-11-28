import imageUrlBuilder from '@sanity/image-url'
import clientConfig from '../../client-config'

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(source)
}

// Helper to get a responsive image URL
export function getResponsiveImageUrl(source, {width = 800, height, quality = 80} = {}) {
  if (!source || !source.asset) {
    return null
  }
  
  let img = builder.image(source).width(width).quality(quality).auto('format')
  
  if (height) {
    img = img.height(height)
  }
  
  return img.url()
}
