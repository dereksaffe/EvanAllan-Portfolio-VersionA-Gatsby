import React from 'react'
import {graphql} from 'gatsby'
import { Link } from 'gatsby'

import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import ProjectPreview from '../components/project-preview'
import { cn, buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from './archive.module.css'

import {responsiveTitle2} from '../components/typography.module.css'

export const query = graphql`
  query ArchivePageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"})
    {
      title
      description
      keywords
     }
    projects: allSanitySampleProject {
          edges {
        node {
          id
          mainImage {
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
            }
            alt
          }
          title
           slug {
          _key
          _type
          current
        }
        }
      }
       }
  }
`

const ArchivePage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
    /*.filter(filterOutDocsWithoutSlugs)
    .filter(filterOutDocsPublishedInTheFuture) */
    : []



  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className={styles.archiveContainer}>
          {projectNodes &&
            projectNodes.map(node => (
              <ul className={styles.projectContainer} key={node.id}>
                <Link className={styles.root} to={`/project/${node.slug.current}`}>


                  <li  className={responsiveTitle2}>
                    <p className={styles.projectItem}> {node.title} </p>
                   </li>
                  </Link>

                {node.mainImage && node.mainImage.asset && (
                  <img
                    src={imageUrlFor(buildImageObj(node.mainImage))
                      .fit('clip')
                      .quality(40)
                      .url()}
                    alt={node.mainImage.alt}
                  />
                )}
              </ul>

            ))}
        </div>
      </Container>
   </Layout>
  )
}


export default ArchivePage
