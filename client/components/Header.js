import React from 'react'
import { Row, Col, NavbarBrand, NavLink } from 'reactstrap'

const styles = {
  row: {
    height: '60px'
  }
}

export default function Header() {
  return (
    <Row className="bg-white border shadow-sm align-items-center" style={styles.row}>
      <Col md="6">
        <NavbarBrand className="font-weight-bold" href="/">
          <i className="fas fa-home fa-lg mr-1"></i>SmartBuy
        </NavbarBrand>
      </Col>
      <Col md="6">
        <NavLink className="d-flex justify-content-end" href="/">Scenarios</NavLink>
      </Col>
    </Row>
  )
}
