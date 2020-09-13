import {Link} from 'gatsby'
import React, { useState } from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'

import styles from './header.module.css'
import { responsiveTitle3 } from '../components/typography.module.css'


const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {

  const [text, setText] = useState('A');

  const setContent = (text) => {
    setText(text);
  }


  return (<div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li >
            <Link className={styles.aBold} to='/about/' onMouseOver={() => setText('About Evan')}
                                 onMouseLeave={() => setText('A')}>{text}</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div> )
}

export default Header
