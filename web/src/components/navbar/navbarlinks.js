// NavbarLinks.js

import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

const NavItem = styled(Link)`
  text-decoration: none;
  color: #111;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
    text-align: center;
  }
`

const NavbarLinks = ({onLinkClick}) => {
  return (
    <>
      <NavItem to="/" onClick={onLinkClick}>Home</NavItem>
      <NavItem to="/about/" onClick={onLinkClick}>About Evan</NavItem>
      <NavItem to="/archive/" onClick={onLinkClick}>Projects</NavItem>
    </>
  )
}

export default NavbarLinks
