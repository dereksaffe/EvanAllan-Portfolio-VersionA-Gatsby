// Navbar.js

import React, { useState } from "react"
import styled from "styled-components"
import NavbarLinks from "./navbarlinks.js"

const Navigation = styled.nav`
  display: none;
  display: flex;
  background-color: none;
  position: relative;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 2;
  align-self: center;

  @media (max-width: 768px) {
      display: flex;
    position: sticky;
    height: 8vh;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
  }
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 1.2em;

  @media (max-width: 768px) {
    display: flex;
  }
`

const Navbox = styled.div`
  display: none;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  font-weight: 700;

  @media (max-width: 768px) {
      display: flex;

    flex-direction: column;
    position: fixed;
    width: 100%;
    justify-content: flex-start;
    padding-top: 10vh;
    background-color: var(--color-peach);
    transition: all 0.3s ease-in;
    top: 8vh;
    left: ${props => (props.open ? "-100%" : "0")};
  }
`

const Hamburger = styled.div`
  background-color: #111;
  width: 30px;
  height: 3px;
  transition: all .3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #111;
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
    props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <Navigation>
      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <Hamburger open /> : <Hamburger />}
      </Toggle>
      {navbarOpen ? (
        <Navbox>
          <NavbarLinks />
        </Navbox>
      ) : (
          <Navbox open>
            <NavbarLinks />
          </Navbox>
        )}
    </Navigation>
  )
}

export default Navbar
