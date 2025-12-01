import {Link} from 'gatsby'
import React, {useState, useEffect, useRef} from 'react'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import * as styles from './project-preview.module.css'

function ProjectPreview(props) {
  const {slug, mainImage, title, _rawImagesGallery, imagesGallery, priority = false, shuffleKey = 0} = props
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Initialize with random index
    if (_rawImagesGallery && _rawImagesGallery.length > 0) {
      return Math.floor(Math.random() * _rawImagesGallery.length)
    }
    return 0
  })
  const isFirstRender = useRef(true)
  const imgRef = useRef(null)

  
  // Safety check for required data
  if (!slug?.current || !_rawImagesGallery || _rawImagesGallery.length === 0) {
    return null
  }

  const selectedImage = _rawImagesGallery[selectedIndex] || _rawImagesGallery[0]

  if (!selectedImage?.asset) {
    return null
  }

  const imageObj = buildImageObj(selectedImage)
  if (!imageObj) {
    return null
  }

  // Generate responsive image URLs with srcset
  const baseUrl = imageUrlFor(imageObj)
  const imageUrl = baseUrl.width(1200).quality(100).auto('format').url()

  // Re-randomize when shuffleKey changes (but not on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (_rawImagesGallery && _rawImagesGallery.length > 0) {
      setSelectedIndex(Math.floor(Math.random() * _rawImagesGallery.length))
      setIsLoaded(false)
      setHasError(false)
    }
  }, [shuffleKey, _rawImagesGallery])

  // Check if image is already loaded (cached images) and add fallback timeout
  useEffect(() => {
    let timeoutId
    
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
  }, [selectedIndex, imageUrl])
  
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
      <div className={styles.leadMediaThumb}>
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
            setHasError(false)
          }}
          onError={() => {
            setHasError(true)
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
