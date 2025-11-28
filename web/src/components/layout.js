import React from 'react'
import Header from './header'
import styled from 'styled-components'
import {ShuffleProvider} from '../context/shuffle-context'

import '../styles/layout.css'
import * as styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, path}) => {
  return (
    <ShuffleProvider>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <StyledLayout path={path} className={styles.content || ''}>{children}</StyledLayout>
    </ShuffleProvider>
  )
}

const StyledLayout = styled.main`
  background: ${({path}) => (path === '/ar/' ? '#fff1d6' : '#fff1d6')}
`

export default Layout
