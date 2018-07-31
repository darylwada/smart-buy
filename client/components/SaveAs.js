import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'

export default class SaveAs extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      scenarioName: null,
      warning: false
    }
  }

  handleChange = ({ target }) => {
    this.setState({ scenarioName: target.value })
  }

  handleSaveAs = () => {
    const { scenarioName } = this.state
    if (!scenarioName) return this.setState({ warning: true })

    const { inputs } = this.props
    const reqBody = Object.assign({ name: scenarioName }, inputs)
    const req = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/scenarios', req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.props.setCurrentScenario({ name: scenario.name, id: scenario.id }))
      .then(() => this.props.toggleSaveAs())
  }

  render() {
    console.log(this.state)
    const { isOpen, toggleSaveAs } = this.props
    return (
      <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggleSaveAs}>New Scenario Name</ModalHeader>
      <ModalBody>
        <Input id="scenario-name" onChange={this.handleChange}></Input>
        <p className={this.state.warning ? 'text-danger' : 'invisible'}>Invalid scenario name.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleSaveAs}>Save</Button>
      </ModalFooter>
      </Modal>
    )
  }
}
