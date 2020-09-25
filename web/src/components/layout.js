import React from 'react'

import Header from './header'

import styled from 'styled-components'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, path}) => {
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <StyledLayout path={path} className={styles.content}>{children}</StyledLayout>
    </>
  )
}

const StyledLayout = styled.main`
  background-color: ${({path}) => (path == '/archive/' ? '#fff' : '#FFEAC1')}
`

export default Layout
