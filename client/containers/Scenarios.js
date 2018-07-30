import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem } from 'reactstrap'
import Confirm from '../components/Confirm'

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
      confirm: false,
      warning: false,
      newScenarioName: null,
      overwriteId: null,
      selectedScenario: null,
      savedScenarios: []
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOverwrite = this.handleOverwrite.bind(this)
    this.getScenarios = this.getScenarios.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.toggleConfirm = this.toggleConfirm.bind(this)
  }

  toggle() {
    if (!this.state.modal) return this.getScenarios()
    this.setState({ 
      modal: !this.state.modal,
      newScenarioName: null
    })
  }

  toggleConfirm(overwriteId) {
    this.setState({ confirm: !this.state.confirm, overwriteId })
  }

  handleChange({ target }) {
    this.setState({ newScenarioName: target.value })
  }

  handleSave({ target }) {
    const { newScenarioName, savedScenarios, selectedScenario } = this.state
    if (!newScenarioName && !selectedScenario) return this.setState({ warning: true })
    if (savedScenarios.length > 0) {
      for (let i = 0; i < savedScenarios.length; i++) {
        if (savedScenarios[i].name === newScenarioName || savedScenarios[i].name === selectedScenario.name && target.id !== 'overwrite') return this.toggleConfirm(savedScenarios[i].id)
      }
    }
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

  handleOverwrite() {
    const { inputs } = this.props
    const req = {
      method: 'PUT',
      body: JSON.stringify(inputs),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('/scenarios/' + this.state.overwriteId, req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.toggle())
  }

  handleSelect({ target }) {
    const { id, name } = target.dataset
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
      .then(savedScenarios => this.setState({ modal: !this.state.modal, warning: false, confirm: false, overwriteId: null, savedScenarios }))
  }

  render() {
    console.log(this.state)
    const { savedScenarios, selectedScenario, newScenarioName } = this.state
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
      <Button outline color="primary" className="float-right" onClick={this.toggle}>Scenarios</Button>
      <Modal isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggle}>Scenarios</ModalHeader>
        <ModalBody>
          <label>Saved scenarios:</label>
          <ListGroup className="border mb-3 overflow-scroll" style={styles.scenariosList}>
            {$scenarios}
          </ListGroup>
          <label htmlFor="scenario-name">New scenario name:</label>
          <Input id="scenario-name" onChange={this.handleChange}></Input>
          <p className={this.state.warning ? 'text-danger' : 'invisible'}>Invalid scenario name.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSave}>Save</Button>
          <Button color="primary" onClick={this.handleOpen}>Open</Button>
        </ModalFooter>
        <Confirm 
          isOpen={this.state.confirm} 
          toggleConfirm={this.toggleConfirm} 
          newScenarioName={newScenarioName}
          handleOverwrite={this.handleOverwrite}></Confirm>
      </Modal>
      </Fragment>
    )
  }
}