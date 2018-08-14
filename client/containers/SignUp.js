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

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      username: '',
      password: '',
      duplicate: false
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen },
      () => this.resetCredentials(this.state.isOpen))
  }

  resetCredentials = isOpen => {
    if (isOpen) this.setState({ username: '', password: '', duplicate: false })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { username, password } = this.state
    const user = Object.assign({ username, password })
    const req = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/auth/sign-up', req)
      .then(res => {
        if (res.status === 400) return this.setState({ duplicate: true })
        res.ok && this.toggle()
      })
      .then(() => {
        this.props.setUser(username)
        this.props.clearScenarioName()
      })
      .catch(err => console.error(err))
  }

  validateUsername = () => {
    const { username, duplicate } = this.state
    if (username.length < 1) return 'Please enter a username.'
    if (duplicate) return 'Username already exists.'
  }

  validatePassword = () => {
    const { password } = this.state
    if (password.length < 8) return 'Password must be at least 8 characters long.'
  }

  render() {
    const { username, password } = this.state
    const { handleChange, handleSubmit } = this
    const usernameMessage = this.validateUsername()
    const passwordMessage = this.validatePassword()
    return (
      <Fragment>
        <Button color="link" style={styles.signup} onClick={this.toggle}>Sign Up</Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="auth-form-username">Username</Label>
                <Label className="text-danger" style={styles.errorMessage}>{usernameMessage}</Label>
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
                <Label className="text-danger" style={styles.errorMessage}>{passwordMessage}</Label>
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
