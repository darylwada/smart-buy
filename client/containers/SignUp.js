import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap'

const styles = {
  signup: {
    fontSize: '0.85rem',
    color: 'rgba(43, 70, 96'
  }
}

export default class ScenariosList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <Fragment>
        <Button color="link" style={styles.signup} onClick={this.toggle}>Sign Up</Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
          <ModalBody>
            </ModalBody>
          <ModalFooter>
            <Button color="primary">Sign Up</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}
