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
    const { savedScenarios, inputs, handleScenarioOpen, toggleSaveAs, getScenarios } = this.props
    const existingScenario = savedScenarios.find(scenario => scenario.name === scenarioName)

    if (!scenarioName) return this.setState({ warning: 'invalid' })
    if (existingScenario) return this.setState({ warning: 'existing' })

    const reqBody = Object.assign({ ...inputs }, { name: scenarioName })
    const req = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/scenarios', req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && handleScenarioOpen(scenario))
      .then(() => toggleSaveAs())
      .then(() => getScenarios())
  }

  render() {
    const { isOpen, toggleSaveAs } = this.props
    const { warning } = this.state
    const { handleChange, handleSaveAs } = this
    const warningMessage = warning === 'invalid'
      ? 'Invalid scenario name.'
      : 'Scenario already exists.'
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggleSaveAs}>New Scenario Name</ModalHeader>
        <ModalBody>
          <Input id="scenario-name" onChange={handleChange}></Input>
          <p className={warning ? 'text-danger' : 'invisible'}>{warningMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveAs}>Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
