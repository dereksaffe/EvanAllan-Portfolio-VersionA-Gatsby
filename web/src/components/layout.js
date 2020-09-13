import React, { useState } from 'react'
import { Link } from 'gatsby'

import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'
import {responsiveTitle3} from '../components/typography.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => {

  const [text, setText] = useState('E');

  const setContent = (text) => {
    setText(text);
  }

 return(
 <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.content}>{children}</div>
    <div className={styles.footerWrapper}>
       <div className={styles.footer}>
         <div className={responsiveTitle3}>
           <Link  to='/archive/' onMouseOver={() => setText("Evan's Projects")}
         onMouseLeave={() => setText('E')}>{text}</Link>
         </div>
        <h3 className={responsiveTitle3}>Next</h3></div>
    </div>

  </>
 )
}

export default Layout
