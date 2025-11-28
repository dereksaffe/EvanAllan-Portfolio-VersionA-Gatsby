// Load variables from `.env` if file exists (for local development only)
// In production, Netlify provides environment variables directly
// dotenv is optional and only needed for local development
const fs = require('fs')
const path = require('path')

// Check if dotenv module is available (it's in devDependencies, may not be in production)
let dotenv
try {
  require.resolve('dotenv')
  dotenv = require('dotenv')
} catch (e) {
  // dotenv not available - this is fine for production
  // Environment variables will come from Netlify or system environment
  dotenv = null
}

// Only load .env file if dotenv is available and file exists
if (dotenv) {
  const envFile = `.env.${process.env.NODE_ENV || 'development'}`
  const envPath = path.resolve(process.cwd(), envFile)
  
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envFile })
  }
}

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: 'Evan Allan Portfolio',
    description: 'Portfolio website built with Gatsby and Sanity',
    siteUrl: 'https://evanallan-portfolio-versiona-gatsby.netlify.app',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    'gatsby-plugin-styled-components',
  ],
  // Gatsby 5 flags
  trailingSlash: 'always',
}
