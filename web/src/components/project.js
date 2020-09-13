import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import {Link} from 'gatsby'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'

import styles from './project.module.css'

function Project (props) {
  const {_rawBody, title, _rawImagesGallery, categories, mainImage, members, publishedAt, relatedProjects} = props
  return (
   <article className={styles.root}>
      <div className={styles.wrapper}>

          <div className={styles.mainContent}>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>


        <div className={styles.imagesGallery}>
          { _rawImagesGallery.map (image => {
               return (<img
            src={imageUrlFor(buildImageObj(image))
              .width(400)
              .height(500)
              .fit('clip')
              .quality(100)
              .url()}
            alt={image.alt}  />)}) }
          </div>
    </div>


    </article>
  )
}

export default Project
