import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BlockText from '../components/block-text'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'



import styles from './about.module.css'




import { responsiveTitle1 } from '../components/typography.module.css'



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
    }
  }
}
`




const AboutPage = props => {
  const { data, errors } = props

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
  return (
  <article className={styles.root}>
   <Layout>
      <SEO title='About' />
          <div className={styles.aboutPageContainer}>

            <div className={styles.bio}>
              <BlockText blocks={site._rawBio || []} />
              </div>

            <div id={styles.pic}>
              <img
                src={imageUrlFor(buildImageObj(site._rawProfileImage))
                  .width(450)
                  .height(Math.floor((9 / 16) * 900))
                  .fit('crop')
                  .url()}
                alt={site._rawProfileImage.alt}/>
            </div>

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
