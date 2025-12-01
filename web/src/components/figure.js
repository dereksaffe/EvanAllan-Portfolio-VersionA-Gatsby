import React, {useState} from 'react'
import {imageUrlFor} from '../lib/image-url'

import * as styles from './figure.module.css'

export default function Figure({node}) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!node || !node.asset) {
    return null
  }

  // Build the image URLs
  const imageUrl = imageUrlFor(node)
    .width(1200)
    .quality(100)
    .auto('format')
    .url()

  const lqipUrl = imageUrlFor(node)
    .width(30)
    .quality(20)
    .blur(10)
    .auto('format')
    .url()

  const srcSet = [400, 600, 800, 1200]
    .map(w => `${imageUrlFor(node).width(w).quality(100).auto('format').url()} ${w}w`)
    .join(', ')

  return (
    <figure className={styles.root}>
      <div className={styles.imageContainer}>
        {/* Low quality placeholder */}
        <img
          src={lqipUrl}
          alt=""
          aria-hidden="true"
          className={styles.placeholder}
          style={{opacity: isLoaded ? 0 : 1}}
        />
        {/* Main image */}
        <img
          src={imageUrl}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, 800px"
          alt={node.alt || ''}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={styles.image}
          style={{opacity: isLoaded ? 1 : 0}}
        />
      </div>
      {node.caption && <figcaption className={styles.caption}>{node.caption}</figcaption>}
    </figure>
  )
}
