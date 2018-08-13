import React from 'react'
import { Row, Navbar, Nav, NavItem } from 'reactstrap'
import SignUp from '../containers/SignUp'

const styles = {
  navBar: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '2rem'
  }
}

export default function Header(props) {
  return (
    <Row className="bg-white border-bottom">
      <Navbar style={styles.navBar}>
        <Nav>
          <NavItem>
            <SignUp>
            </SignUp>
          </NavItem>
        </Nav>
      </Navbar>
    </Row>
  )
}