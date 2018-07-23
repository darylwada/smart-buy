import React from 'react'
import { Row, Navbar, NavbarBrand } from 'reactstrap'

export default function Header() {
  return (
    <Row className="bg-white border shadow-sm">
      <Navbar>
        <NavbarBrand className="font-weight-bold" href="/">
          <i className="fas fa-home fa-lg mr-3"></i>SmartBuy
        </NavbarBrand>
      </Navbar>
    </Row>
  )
}
