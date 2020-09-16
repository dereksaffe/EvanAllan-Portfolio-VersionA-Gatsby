import {Link} from 'gatsby'
import React from 'react'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import styles from './project-preview.module.css'
import {responsiveTitle3} from './typography.module.css'

function ProjectPreview (props) {
  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .fit('clip')
              .quality(60)
              .url()}
            alt={props.mainImage.alt}
          />
        )}
        <div className={styles.overlay}>
          {props.title}
        </div>
      </div>
    </Link>
  )
}

export default ProjectPreview
