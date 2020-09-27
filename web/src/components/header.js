import {Link} from 'gatsby'
import React, { useState } from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'
import Navbar from './navbar/navbar.js'

import styles from './header.module.css'


const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {

  const [aboutText, setAbout] = useState('A');

   const [projectText, setProject] = useState('E')

  /*const setAbout = (text) => {
    setText(text);
  }*/


  return (<div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div>


      <Navbar />




      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link className={cn(styles.aBold, styles.onlyDesktopNavItem)} to='/about/' onMouseOver={() => setAbout('About Evan')}
                                 onMouseLeave={() => setAbout('A')}>{aboutText}</Link>
          </li>

        </ul>
      </nav>
      <nav className={cn(styles.nav, showNav && styles.showNav)}>
      <div className={styles.evansProjectText}>
        <Link className={styles.aBold} to='/archive/' onMouseOver={() => setProject("Evan's Projects")}
          onMouseLeave={() => setProject('E')}>{projectText}</Link>
      </div>
      <div className={styles.nextButton}>
        <h3 className={styles.aBold}>Next</h3>
      </div>
      </nav>

    </div>

  </div> )
}

export default Header
