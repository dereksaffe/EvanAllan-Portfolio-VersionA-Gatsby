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
  background: ${({path}) => (path === '/ar/' ? '#fff1d6' : '#fff1d6')}
`

export default Layout
