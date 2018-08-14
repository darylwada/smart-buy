import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, Label } from 'reactstrap'

const styles = {
  signup: {
    fontSize: '0.85rem',
    color: 'rgba(43, 70, 96)'
  },
  errorMessage: {
    fontSize: '0.8rem',
    marginLeft: '1rem'
  }
}

export default class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      username: '',
      password: ''
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen },
      () => this.resetCredentials(this.state.isOpen))
  }

  resetCredentials = isOpen => {
    if (isOpen) this.setState({ username: '', password: '' })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    const { username, password } = this.state
    const { handleChange, handleSubmit } = this
    return (
      <Fragment>
        <Button color="link" style={styles.signup} onClick={this.toggle}>Log In</Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Log In</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
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
                <Button type="submit" color="primary">Log In</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}
