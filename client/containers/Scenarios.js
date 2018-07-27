import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap'

const styles = {
  scenariosList: {
    minHeight: '200px'
  },
  scenario: {
    cursor: 'pointer'
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
    if (!this.state.modal) {
      this.getScenarios()
    }
    else {
      this.setState({ 
        modal: !this.state.modal,
        currentScenario: null
      })
    }
  }

  handleChange({ target }) {
    this.setState({ currentScenario: target.value })
  }

  handleSave() {
    const { currentScenario } = this.state
    const { inputs } = this.props
    const reqBody = Object.assign({}, { scenario: currentScenario }, inputs)
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
    const name = target.getAttribute('data-name')
    const id = target.getAttribute('data-id')
    this.setState({ 
      selectedScenario: { name, id }
    })
  }

  handleOpen() {
    fetch('/scenarios/' + this.state.selectedScenario.id)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.props.handleScenarioOpen(scenario))
      .then(() => this.toggle())
  }

  getScenarios() {
    fetch('/scenarios')
      .then(res => res.ok ? res.json() : null)
      .then(savedScenarios => this.setState({ modal: !this.state.modal, savedScenarios }))
  }

  render() {
    console.log(this.state)
    const { savedScenarios } = this.state
    const $scenarios = savedScenarios.map((scenario, i) => {
      const highlight = this.state.selectedScenario && scenario.id === this.state.selectedScenario.id
        ? 'border-0 bg-light-gray'
        : 'border-0'
      return (
        <ListGroupItem 
          data-name={scenario.scenario} 
          data-id={scenario.id}
          className={highlight} 
          style={styles.scenario} 
          key={i} 
          onClick={this.handleSelect}>
          {scenario.scenario}
        </ListGroupItem>
      )
    })

    return (
      <Fragment>
      <Button outline color="primary" className="float-right" onClick={this.toggle} >Scenarios</Button>
      <Modal  isOpen={this.state.modal}>
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