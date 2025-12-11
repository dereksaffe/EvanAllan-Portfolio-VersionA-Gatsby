import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      filter: {featured: {eq: true}}
      limit: 6
    ) {
      edges {
        node {
          id
          featured
          homepageOrder
          _createdAt
          _rawImagesGallery
          imagesGallery {
            _key
            _type
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
              metadata {
                dimensions {
                  width
                  height
                  aspectRatio
                }
              }
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

const IndexPage = (props) => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  let projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
    : []

  // Sort projects by homepageOrder (handle null values by putting them last)
  projectNodes = projectNodes.sort((a, b) => {
    const orderA = a.homepageOrder ?? 999 // Put null/undefined values last
    const orderB = b.homepageOrder ?? 999
    if (orderA !== orderB) {
      return orderA - orderB
    }
    // If order is the same or both null, maintain original order
    return 0
  })

  // Debug: Log project order values (remove in production)
  if (typeof window !== 'undefined' && projectNodes.length > 0) {
    console.log('Featured projects order:', projectNodes.map(p => ({
      title: p.title,
      homepageOrder: p.homepageOrder,
      featured: p.featured
    })))
  }

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {projectNodes && projectNodes.length > 0 && (
          <ProjectPreviewGrid nodes={projectNodes} />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
