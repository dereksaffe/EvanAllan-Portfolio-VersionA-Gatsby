import {Link} from 'gatsby'
import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import styles from './project-preview.module.css'


const randomGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function ProjectPreview (props) {
  const { slug, mainImage, title, _rawImagesGallery, imagesGallery} = props


  const randomGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const randomPosition = randomGenerator(0, _rawImagesGallery.length - 1)


  return (
    <Link className={styles.root} to={`/project/${slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {_rawImagesGallery[randomPosition] && _rawImagesGallery[randomPosition].asset && (
          <img
            src={imageUrlFor(buildImageObj(_rawImagesGallery[randomPosition]))
              .fit('clip')
              .quality(50)
              .url()}
            alt={_rawImagesGallery[randomPosition].alt}
          />
        )}
        <div className={styles.overlay}>
          {title}
        </div>
      </div>
    </Link>
  )
}

export default ProjectPreview







