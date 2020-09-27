import React from 'react'

import Header from './header'

import styled from 'styled-components'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <Layout className={styles.content}>{children}</Layout>
    </>
  )
}

export default Layout
