import React from 'react'
import { Row, Navbar, Nav, NavItem } from 'reactstrap'
import SignUp from '../containers/SignUp'
import LogIn from '../containers/LogIn'

const styles = {
  navBar: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '2rem'
  },
  greeting: {
    left: '50%',
    transform: 'translateX(-50%)',
    height: '2rem',
    fontSize: '0.8rem',
    lineHeight: '2rem',
    color: 'rgb(55, 165, 229)'
  }
}

export default function Header(props) {
  const { setUser, user } = props
  const greeting = user 
    ? `Hello, ${user}`
    : ''
  return (
    <Row className="bg-white border-bottom">
      <Navbar style={styles.navBar}>
        <Nav>
          <span 
            className="position-absolute" 
            style={styles.greeting}>
            {greeting}
          </span>
          <NavItem>
            <SignUp setUser={setUser}></SignUp>
          </NavItem>
          <NavItem>
            <LogIn></LogIn>
          </NavItem>
        </Nav>
      </Navbar>
    </Row>
  )
}