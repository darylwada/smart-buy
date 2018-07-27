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
    this.state = { 
      modal: false,
      scenario: null
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  toggle() {
    this.setState({ 
      modal: !this.state.modal,
      scenario: null
    })
  }

  handleChange({ target }) {
    this.setState({ scenario: target.value })
  }

  handleSave() {
    const { scenario } = this.state
    const { inputs } = this.props
    const reqBody = Object.assign({}, { scenario }, inputs)
    const req = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/scenarios', req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.toggle())
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
              <Scenarios 
                isOpen={this.state.modal} 
                toggle={this.toggle} 
                handleSave={this.handleSave}
                handleChange={this.handleChange}>
              </Scenarios>
            </NavItem>
          </Nav>
        </Navbar>
      </Row>
    )
  }
}