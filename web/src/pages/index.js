import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import styles from './about.module.css'


export const query = graphql`

  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"})
    {
      title
      description
      keywords
     }
      projects: allSanitySampleProject
      (filter: {featured: {eq: true}})
      {
          edges {
        node {
          id
          featured
          _rawImagesGallery
          imagesGallery {
          _key
          _type
          asset {
            id
          }
        }
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

const IndexPage = props => {
  const {data, errors} = props

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

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div>
        <h1 hidden>Welcome to {site.title}</h1>
        {projectNodes && (
          <ProjectPreviewGrid
            title='Latest projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
          />
        )}
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage
