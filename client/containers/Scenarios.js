import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap'
import ScenarioPrompt from '../components/ScenarioPrompt'

const styles = {
  scenariosList: {
    height: '200px',
    overflow: 'scroll'
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
      nestedModal: false,
      newScenarioName: null,
      selectedScenario: null,
      savedScenarios: []
    }
    this.toggle = this.toggle.bind(this)
    this.toggleNested = this.toggleNested.bind(this)
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
        newScenarioName: null
      })
    }
  }

  toggleNested() {
    this.setState({ nestedModal: !this.state.nestedModal })
  }

  handleChange({ target }) {
    this.setState({ newScenarioName: target.value })
  }

  handleSave() {
    const { newScenarioName } = this.state
    if (!newScenarioName) return this.toggleNested()
    const { inputs } = this.props
    const reqBody = Object.assign({}, { name: newScenarioName }, inputs)
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
    const { savedScenarios, selectedScenario } = this.state
    const $scenarios = savedScenarios.map((scenario, i) => {
      const selected = selectedScenario && scenario.id === selectedScenario.id
        ? 'border-0 bg-light-gray'
        : 'border-0'
      return (
        <ListGroupItem 
          data-name={scenario.name} 
          data-id={scenario.id}
          className={selected} 
          style={styles.scenario} 
          key={i} 
          onClick={this.handleSelect}>
          {scenario.name}
        </ListGroupItem>
      )
    })

    return (
      <Fragment>
      <Button outline color="primary" className="float-right" onClick={this.toggle} >Scenarios</Button>
      <Modal isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggle}>Scenarios</ModalHeader>
        <ModalBody>
          <label>Saved scenarios:</label>
          <ListGroup className="border mb-3 overflow-scroll" style={styles.scenariosList}>
            {$scenarios}
          </ListGroup>
          <label htmlFor="scenario-name">New scenario name:</label>
          <Input id="scenario-name" onChange={this.handleChange}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSave}>Save</Button>
          <Button color="primary" onClick={this.handleOpen}>Open</Button>
        </ModalFooter>
        <ScenarioPrompt isOpen={this.state.nestedModal} toggleNested={this.toggleNested}></ScenarioPrompt>
      </Modal>
      </Fragment>
    )
  }
}