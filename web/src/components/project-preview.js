import {Link} from 'gatsby'
import React, {useState, useEffect, useRef} from 'react'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import * as styles from './project-preview.module.css'

function ProjectPreview(props) {
  const {slug, mainImage, title, _rawImagesGallery, priority = false} = props
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  const fallbackImage = _rawImagesGallery && _rawImagesGallery.length > 0 ? _rawImagesGallery[0] : null
  const selectedImage = mainImage || fallbackImage

  if (!slug?.current || !selectedImage?.asset) {
    return null
  }

  const imageObj = buildImageObj(selectedImage)
  if (!imageObj) {
    return null
  }

  // Calculate aspect ratio from image metadata
  const getAspectRatio = () => {
    const metadata = selectedImage.asset?.metadata?.dimensions
    if (!metadata) return null
    
    // Use aspectRatio if available, otherwise calculate from width/height
    if (metadata.aspectRatio) {
      return metadata.aspectRatio
    }
    if (metadata.width && metadata.height) {
      return metadata.width / metadata.height
    }
    return null
  }
  
  const aspectRatio = getAspectRatio()

  const baseUrl = imageUrlFor(imageObj)
  const imageUrl = baseUrl.width(1200).quality(100).auto('format').url()

  // Check if image is already loaded (cached images) and add fallback timeout
  useEffect(() => {
    let timeoutId
    setIsLoaded(false)
    
    const checkImageLoaded = () => {
      if (imgRef.current) {
        // If image is already complete (cached), show it immediately
        if (imgRef.current.complete && imgRef.current.naturalHeight > 0) {
          setIsLoaded(true)
          return
        }
      }
      
      // Fallback: if image hasn't loaded after 3 seconds, show it anyway
      // This prevents images from being stuck on blur forever
      timeoutId = setTimeout(() => {
        setIsLoaded(true)
      }, 3000)
    }

    // Check immediately and after a short delay (for cached images)
    checkImageLoaded()
    const immediateTimeout = setTimeout(checkImageLoaded, 100)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      clearTimeout(immediateTimeout)
    }
  }, [imageUrl])
  
  // Generate srcset for responsive images
  const srcSet = [400, 600, 800, 1200, 1600, 2000]
    .map(w => `${baseUrl.width(w).quality(100).auto('format').url()} ${w}w`)
    .join(', ')

  // Low quality placeholder - less blur
  const lqipUrl = imageUrlFor(imageObj)
    .width(60)
    .quality(40)
    .blur(8)
    .auto('format')
    .url()

  return (
    <Link className={styles.root} to={`/project/${slug.current}/`}>
      <div 
        className={styles.leadMediaThumb}
        style={aspectRatio ? {
          aspectRatio: aspectRatio.toString()
        } : {}}
      >
        {/* Background placeholder - smooth blur effect */}
        <div 
          className={styles.placeholderBg}
          style={{
            backgroundImage: `url(${lqipUrl})`,
            opacity: isLoaded ? 0 : 1,
            visibility: isLoaded ? 'hidden' : 'visible'
          }}
          aria-hidden="true"
        />
        {/* Main image with responsive srcset */}
        <img
          ref={imgRef}
          src={imageUrl}
          srcSet={srcSet}
          sizes="(max-width: 450px) 90vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 600px"
          alt={selectedImage.alt || title || ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => {
            setIsLoaded(true)
          }}
          onError={() => {
            setIsLoaded(true) // Show image even if there's an error
          }}
          className={styles.mainImage}
          style={{opacity: isLoaded ? 1 : 0}}
        />
        <div className={styles.overlay}>{title}</div>
      </div>
    </Link>
  )
}

export default ProjectPreview
