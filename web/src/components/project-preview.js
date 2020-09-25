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
  const { slug, mainImage, title, _rawImagesGallery} = props




  return (
    <Link className={styles.root} to={`/project/${slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .fit('clip')
              .quality(60)
              .url()}
            alt={mainImage.alt}
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







