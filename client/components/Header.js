import React from 'react'
import { Row, NavbarBrand, Navbar, Nav, NavItem } from 'reactstrap'
import Scenarios from '../containers/Scenarios'

const styles = {
  navBar: {
    width: '100%',
    padding: '1rem 1rem'
  }
}

export default function Header(props) {
  return (
    <Row className="bg-white border-bottom shadow-sm">
      <Navbar style={styles.navBar}>
        <NavbarBrand className="font-weight-bold" href="/">
          <i className="fas fa-home fa-lg mr-1"></i>SmartBuy
        </NavbarBrand>
        <Nav>
          <NavItem>
            <Scenarios 
              inputs={props.inputs} 
              handleScenarioOpen={props.handleScenarioOpen}
              clearScenarioName={props.clearScenarioName}
              currentScenario={props.currentScenario}>
            </Scenarios>
          </NavItem>
        </Nav>
      </Navbar>
    </Row>
  )
}