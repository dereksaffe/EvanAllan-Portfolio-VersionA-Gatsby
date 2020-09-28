import React from 'react'

import Header from './header'

import styled from 'styled-components'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  console.log(location.pathname)
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <StyledLayout path={location.pathname} className={styles.content}>{children}</StyledLayout>
    </>
  )
}

const StyledLayout = styled.main`
  background: ${({path}) => (path === '/ar/' ? '#FFEAC1' : '#FFEAC1')}
`

export default Layout
