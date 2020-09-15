import React from 'react'

import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <div className={styles.content}>{children}</div>
    </>
  )
}

export default Layout

/* < div className = { styles.footerWrapper } >
    <div className={styles.footer}>
      <div className={responsiveTitle3}>
        <Link to='/archive/' onMouseOver={() => setText("Evan's Projects")}
          onMouseLeave={() => setText('E')}>{projectText}</Link>
      </div>
      <h3 className={responsiveTitle3}>Next</h3>
    </div>
    </div > */
