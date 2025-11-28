const path = require('path')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const {createPage} = actions
  
  const result = await graphql(`
    {
      allSanitySampleProject {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading Sanity projects', result.errors)
    return
  }

  const projectNodes = result.data.allSanitySampleProject?.nodes || []

  projectNodes.forEach((node) => {
    if (!node.slug?.current) {
      reporter.warn(`Project ${node.id} is missing a slug, skipping page creation`)
      return
    }

    const slug = node.slug.current
    const projectPath = `/project/${slug}/`

    createPage({
      path: projectPath,
      component: path.resolve('./src/templates/project.js'),
      context: {
        id: node.id,
      },
    })
  })

  reporter.info(`Created ${projectNodes.length} project pages`)
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createProjectPages(graphql, actions, reporter)
}

// Gatsby 5: Handle Webpack configuration for older packages
exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: false,
      },
    },
  })
}
