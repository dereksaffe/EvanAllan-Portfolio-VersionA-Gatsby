module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'tyru08of',
    dataset: process.env.GATSBY_SANITY_DATASET || 'production',
    // Use the CDN for faster responses in production
    useCdn: process.env.NODE_ENV === 'production',
    // API version - use current date for latest
    apiVersion: '2024-01-01',
  },
}
