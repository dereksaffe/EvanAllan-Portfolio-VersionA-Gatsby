import React, {useState} from 'react'
import {Link} from 'gatsby'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'

import * as styles from './project.module.css'

function GalleryImage({image, index, priority = false}) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  if (!image || !image.asset) return null
  
  const imageObj = buildImageObj(image)
  if (!imageObj) return null

  const imageUrl = imageUrlFor(imageObj)
    .width(1200)
    .quality(100)
    .auto('format')
    .url()

  const lqipUrl = imageUrlFor(imageObj)
    .width(30)
    .quality(25)
    .blur(10)
    .auto('format')
    .url()


  const srcSet = [400, 600, 800, 1200, 1600]
    .map(w => `${imageUrlFor(imageObj).width(w).quality(100).auto('format').url()} ${w}w`)
    .join(', ')

  return (
    <div className={styles.imageWrapper}>
      {/* Low quality placeholder */}
      <img
        src={lqipUrl}
        alt=""
        aria-hidden="true"
        className={styles.imagePlaceholder}
        style={{opacity: isLoaded ? 0 : 1}}
      />
      {/* Main image */}
      <img
        src={imageUrl}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, 70vw"
        alt={image.alt || ''}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={styles.galleryImage}
        style={{opacity: isLoaded ? 1 : 0}}
      />
    </div>
  )
}

function Project(props) {
  const {_rawBody, title, _rawImagesGallery, categories, mainImage, members, publishedAt, relatedProjects} = props

  return (
    <article className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          {_rawBody && <BlockContent blocks={_rawBody || []} />}
        </div>

        <div className={styles.imagesGallery}>
          {_rawImagesGallery && _rawImagesGallery.map((image, index) => (
            <GalleryImage 
              key={image._key || index} 
              image={image} 
              index={index}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

export default Project
