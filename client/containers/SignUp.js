import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, Label } from 'reactstrap'

const styles = {
  signup: {
    fontSize: '0.85rem',
    color: 'rgba(43, 70, 96'
  }
}

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      username: '',
      password: ''
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    console.log(this.state)
    const { username, password } = this.state
    const { handleChange } = this
    return (
      <Fragment>
        <Button color="link" style={styles.signup} onClick={this.toggle}>Sign Up</Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="auth-form-username">Username</Label>
                <Input
                  required
                  autoFocus
                  type="text"
                  name="username"
                  value={username}
                  id="auth-form-username"
                  onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="auth-form-password">Password</Label>
                <Input
                  required
                  type="password"
                  name="password"
                  value={password}
                  id="auth-form-password"
                  onChange={handleChange}/>
              </FormGroup>
              <FormGroup className="text-right py-2">
                <Button type="submit" color="primary">Sign Up</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}
