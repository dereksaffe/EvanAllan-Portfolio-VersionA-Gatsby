import {Link} from 'gatsby'
import React, {useState} from 'react'
import Navbar from './navbar/navbar.js'

import * as styles from './header.module.css'

const Header = ({siteTitle}) => {
  const [isAboutHovered, setIsAboutHovered] = useState(false)
  const [isProjectHovered, setIsProjectHovered] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/">{siteTitle}</Link>
        </div>

        {/* Mobile hamburger menu */}
        <Navbar />

        {/* Desktop navigation - About Evan (top right) */}
        <nav className={styles.desktopNav}>
          <Link
            className={styles.navLink}
            to="/about/"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            <span className={styles.firstLetter}>A</span>
            <span className={`${styles.restOfText} ${isAboutHovered ? styles.visible : ''}`}>
              bout Evan
            </span>
          </Link>
        </nav>
      </div>

      {/* Fixed bottom left - Projects link */}
      <div className={styles.bottomLeftNav}>
        <Link
          className={styles.navLink}
          to="/archive/"
          onMouseEnter={() => setIsProjectHovered(true)}
          onMouseLeave={() => setIsProjectHovered(false)}
        >
          <span className={styles.firstLetter}>E</span>
          <span className={`${styles.restOfText} ${isProjectHovered ? styles.visible : ''}`}>
            van's Projects
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Header
