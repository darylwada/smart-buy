import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap'

const styles = {
  scenariosList: {
    minHeight: '200px'
  },
  scenario: {
    cursor: 'pointer'
  },
  scenarioSelected: {
    backgroundColor: 'lightGray'
  }
}

export default class Scenarios extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      modal: false,
      currentScenario: null,
      selectedScenario: null,
      savedScenarios: []
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.getScenarios = this.getScenarios.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  toggle() {
    if (!this.state.modal) this.getScenarios()
    this.setState({ 
      modal: !this.state.modal,
      currentScenario: null
    })
  }

  handleChange({ target }) {
    this.setState({ currentScenario: target.id })
  }

  handleSave() {
    const { currentScenario } = this.state
    const { inputs } = this.props
    const reqBody = Object.assign({}, { currentScenario }, inputs)
    const req = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/scenarios', req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.toggle())
  }

  handleSelect({ target }) {
    this.setState({ selectedScenario: target.id })
  }

  handleOpen() {
    
  }

  getScenarios() {
    fetch('/scenarios')
      .then(res => res.ok ? res.json() : null)
      .then(savedScenarios => this.setState({ savedScenarios }))
  }

  render() {
    console.log(this.state)
    const { savedScenarios } = this.state
    const $scenarios = savedScenarios.map((scenario, i) => {
      const highlight = scenario.scenario === this.state.selectedScenario
        ? 'border-0 bg-light-gray'
        : 'border-0'
      return (
        <ListGroupItem id={scenario.scenario} className={highlight} style={styles.scenario} key={i} onClick={this.handleSelect}>{scenario.scenario}</ListGroupItem>
      )
    })

    return (
      <Fragment>
      <Button outline color="primary" className="float-right" onClick={this.toggle} >Scenarios</Button>
      <Modal size="lg" isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggle}>Scenarios</ModalHeader>
        <ModalBody>
          <ListGroup className="border mb-3" style={styles.scenariosList}>
            {$scenarios}
          </ListGroup>
          <label htmlFor="scenario-name">Choose a name for this scenario:</label>
          <Input id="scenario-name" onChange={this.handleChange}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleOpen}>Open</Button>
          <Button color="primary" onClick={this.handleSave}>Save</Button>
        </ModalFooter>
      </Modal>
      </Fragment>
    )
  }
}