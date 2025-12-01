import React, {useState} from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BlockText from '../components/block-text'
import {imageUrlFor} from '../lib/image-url'
import {buildImageObj} from '../lib/helpers'

import * as styles from './about.module.css'

export const query = graphql`
  query AboutPageQuery {
    site: sanityAbout(_id: {regex: "/(drafts.|)about/"}) {
      id
      title
      _rawBio
      _rawContact
      _rawAwards
      _rawProfileImage
      profileImage {
        _key
        _type
        caption
        alt
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          metadata {
            dimensions {
              width
              height
              aspectRatio
            }
          }
        }
      }
    }
  }
`

const AboutPage = (props) => {
  const {data, errors} = props
  const [imageLoaded, setImageLoaded] = useState(false)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  if (!site) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  const hasProfileImage = site._rawProfileImage && site.profileImage?.asset
  const imageObj = hasProfileImage ? buildImageObj(site._rawProfileImage) : null
  
  const profileImageUrl = imageObj
    ? imageUrlFor(imageObj)
        .width(800)
        .quality(100)
        .auto('format')
        .fit('crop')
        .url()
    : null

  const lqipUrl = imageObj
    ? imageUrlFor(imageObj)
        .width(30)
        .quality(20)
        .blur(10)
        .auto('format')
        .url()
    : null

  const aspectRatio = site.profileImage?.asset?.metadata?.dimensions?.aspectRatio

  return (
    <article className={styles.root}>
      <Layout>
        <SEO title="About" />
        <div className={styles.aboutPageContainer}>
          <div className={styles.bio}>
            <BlockText blocks={site._rawBio || []} />
          </div>

          {profileImageUrl && (
            <div 
              id={styles.pic}
              style={aspectRatio ? {aspectRatio} : undefined}
            >
              {/* Low quality placeholder */}
              <img
                src={lqipUrl}
                alt=""
                aria-hidden="true"
                className={styles.imagePlaceholder}
                style={{opacity: imageLoaded ? 0 : 1}}
              />
              {/* Main image */}
              <img
                src={profileImageUrl}
                alt={site._rawProfileImage?.alt || 'Profile'}
                loading="eager"
                fetchpriority="high"
                onLoad={() => setImageLoaded(true)}
                className={styles.profileImage}
                style={{opacity: imageLoaded ? 1 : 0}}
              />
            </div>
          )}

          <div className={styles.contact}>
            <BlockText blocks={site._rawContact || []} />
          </div>

          <div className={styles.awards}>
            <BlockText blocks={site._rawAwards || []} />
          </div>
        </div>
      </Layout>
    </article>
  )
}

export default AboutPage
