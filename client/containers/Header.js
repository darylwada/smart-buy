import React, { Component } from 'react'
import { Row, NavbarBrand, Navbar, Nav, NavItem, Button } from 'reactstrap'
import Scenarios from '../components/Scenarios'

const styles = {
  navBar: {
    width: '100%',
  }
}

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    return (
      <Row className="bg-white border shadow-sm">
        <Navbar style={styles.navBar}>
          <NavbarBrand className="font-weight-bold" href="/">
            <i className="fas fa-home fa-lg mr-1"></i>SmartBuy
          </NavbarBrand>
          <Nav>
            <NavItem>
              <Button color="primary" className="float-right" onClick={this.toggle} >Scenarios</Button>
              <Scenarios isOpen={this.state.modal} toggle={this.toggle}></Scenarios>
            </NavItem>
          </Nav>
        </Navbar>
      </Row>
    )
  }
}

// export default function Header() {
//   return (
//     <Row className="bg-white border shadow-sm align-items-center" style={styles.row}>
//       <Col md="6">
//         <NavbarBrand className="font-weight-bold" href="/">
//           <i className="fas fa-home fa-lg mr-1"></i>SmartBuy
//         </NavbarBrand>
//       </Col>
//       <Col md="6">
//         <NavLink className="d-flex justify-content-end" href="/">Scenarios</NavLink>
//       </Col>
//     </Row>
//   )
// }

{/* <Row className="bg-white border shadow-sm align-items-center" style={styles.row}>
<Col md="6">
  <NavbarBrand className="font-weight-bold" href="/">
    <i className="fas fa-home fa-lg mr-1"></i>SmartBuy
  </NavbarBrand>
</Col>
<Col md="6" className="justify-content-end">
  <Button color="primary" className="float-right" onClick={this.toggle} >Scenarios</Button>
  <Scenarios isOpen={this.state.modal} toggle={this.toggle}></Scenarios>
</Col>
</Row> */}