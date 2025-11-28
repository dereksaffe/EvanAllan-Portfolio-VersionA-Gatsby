/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react'

// Add preconnect hints for faster image loading from Sanity CDN
export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    <link
      key="preconnect-sanity-cdn"
      rel="preconnect"
      href="https://cdn.sanity.io"
      crossOrigin="anonymous"
    />,
    <link
      key="dns-prefetch-sanity"
      rel="dns-prefetch"
      href="https://cdn.sanity.io"
    />,
  ])
}
