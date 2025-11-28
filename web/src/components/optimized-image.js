import React, { useState, useEffect } from 'react'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'

/**
 * OptimizedImage component that prevents layout shift and loads images efficiently
 * Uses LQIP (Low Quality Image Placeholder) technique for smooth loading
 */
const OptimizedImage = ({
  image,
  alt = '',
  width = 800,
  height,
  quality = 75,
  loading = 'lazy',
  className = '',
  style = {},
  aspectRatio,
  objectFit = 'cover',
  sizes = '100vw',
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [lqipSrc, setLqipSrc] = useState(null)

  useEffect(() => {
    if (!image || !image.asset) return

    const imageObj = buildImageObj(image)
    if (!imageObj) return

    // Generate low quality placeholder (20px wide, very blurry)
    const lqip = imageUrlFor(imageObj)
      .width(20)
      .quality(20)
      .blur(10)
      .auto('format')
      .url()

    // Generate full quality image with srcset sizes
    const fullImage = imageUrlFor(imageObj)
      .width(width)
      .quality(quality)
      .auto('format')
      .url()

    setLqipSrc(lqip)
    setImageSrc(fullImage)
  }, [image, width, quality])

  if (!image || !image.asset || !imageSrc) {
    return null
  }

  const imageObj = buildImageObj(image)

  // Generate srcset for responsive images
  const srcSet = [400, 600, 800, 1200, 1600]
    .map(w => {
      const url = imageUrlFor(imageObj)
        .width(w)
        .quality(quality)
        .auto('format')
        .url()
      return `${url} ${w}w`
    })
    .join(', ')

  // Calculate aspect ratio from image metadata if available
  const computedAspectRatio = aspectRatio || (image.asset?.metadata?.dimensions 
    ? image.asset.metadata.dimensions.width / image.asset.metadata.dimensions.height
    : undefined)

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    ...(computedAspectRatio && { aspectRatio: computedAspectRatio }),
    ...style,
  }

  const imageStyle = {
    display: 'block',
    width: '100%',
    height: height || 'auto',
    objectFit,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  }

  const placeholderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 0 : 1,
  }

  return (
    <div className={className} style={containerStyle}>
      {/* Low quality placeholder */}
      {lqipSrc && (
        <img
          src={lqipSrc}
          alt=""
          aria-hidden="true"
          style={placeholderStyle}
        />
      )}
      {/* Main image */}
      <img
        src={imageSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        style={imageStyle}
        width={width}
        height={height}
      />
    </div>
  )
}

export default OptimizedImage

