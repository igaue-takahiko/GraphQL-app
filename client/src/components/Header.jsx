import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <Navbar className="mb-4" color="primary" dark>
      <NavbarBrand href="/">Movie list</NavbarBrand>
    </Navbar>
  )
}

export default Header
