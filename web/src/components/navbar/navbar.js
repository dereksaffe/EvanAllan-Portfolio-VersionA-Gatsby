// Navbar.js

import React, { useState } from "react"
import styled from "styled-components"
import NavbarLinks from "./navbarlinks.js"

const Navigation = styled.nav`
  display: none;
  background-color: transparent;
  position: relative;
  z-index: 200;

  @media (max-width: 768px) {
    display: block;
  }
`

const Toggle = styled.button`
  display: none;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 201;

  @media (max-width: 768px) {
    display: block;
  }

  &:focus {
    outline: none;
  }
`

const Navbox = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    background-color: var(--color-peach);
    transition: transform 0.3s ease-in-out;
    top: 0;
    left: 0;
    transform: ${props => (props.open ? "translateX(-100%)" : "translateX(0)")};
    z-index: 199;
  }
`

const Hamburger = styled.span`
  display: block;
  background-color: ${props => (props.open ? "transparent" : "#111")};
  width: 30px;
  height: 3px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: all 0.3s linear;

  &::before {
    content: "";
    display: block;
    width: 30px;
    height: 3px;
    background-color: #111;
    position: absolute;
    left: 0;
    transition: all 0.3s linear;
    top: ${props => (props.open ? "0" : "-10px")};
    transform: ${props => (props.open ? "rotate(45deg)" : "rotate(0)")};
  }

  &::after {
    content: "";
    display: block;
    width: 30px;
    height: 3px;
    background-color: #111;
    position: absolute;
    left: 0;
    transition: all 0.3s linear;
    top: ${props => (props.open ? "0" : "10px")};
    transform: ${props => (props.open ? "rotate(-45deg)" : "rotate(0)")};
  }
`

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <Navigation>
      <Toggle
        onClick={() => setNavbarOpen(!navbarOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={navbarOpen}
      >
        <Hamburger open={navbarOpen} />
      </Toggle>
      <Navbox open={!navbarOpen}>
        <NavbarLinks onLinkClick={() => setNavbarOpen(false)} />
      </Navbox>
    </Navigation>
  )
}

export default Navbar
