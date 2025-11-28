// Load variables from `.env` if file exists (for local development)
// In production, Netlify provides environment variables directly
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const envFile = `.env.${process.env.NODE_ENV || 'development'}`
const envPath = path.resolve(process.cwd(), envFile)

// Only load .env file if it exists (for local development)
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envFile })
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
