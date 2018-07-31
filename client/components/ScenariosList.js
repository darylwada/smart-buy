import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap'

const styles = {
  scenariosList: {
    height: '200px',
    overflow: 'scroll'
  },
  scenario: {
    cursor: 'pointer'
  },
  delete: {
    color: 'rgb(55, 165, 229)'
  }
}

export default class ScenariosList extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selectedScenario: null
    }
  }

  handleSelect = ({ target }) => {
    const { id, name } = target.dataset
    this.setState({ 
      selectedScenario: { name, id }
    })
  }

  handleOpen = () => {
    const { selectedScenario: { id } } = this.state
    fetch(`/scenarios/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && this.props.handleScenarioOpen(scenario))
      .then(() => this.props.toggleList())
  }

  handleDelete = ({ target }) => {
    const { id } = target.closest('.list-group-item').dataset
    const savedScenarios = [...this.props.savedScenarios]
    const deleteIndex = savedScenarios.findIndex(scenario => scenario.id === id)
    savedScenarios.splice(deleteIndex, 1)
    const req = { method: 'DELETE' }
    fetch(`/scenarios/${id}`, req)
      .then(res => res.ok ? this.props.updateSavedScenarios(savedScenarios) : null)
  }

  render() {
    console.log(this.state)
    const { savedScenarios, isOpen, toggleList } = this.props
    const { selectedScenario } = this.state
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
          <i className="fas fa-trash-alt float-right" style={styles.delete} onClick={this.handleDelete}></i>
        </ListGroupItem>
      )
    })

    return (
      <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggleList}>Saved Scenarios</ModalHeader>
      <ModalBody>
        <ListGroup className="border mb-3 overflow-scroll" style={styles.scenariosList}>
          {$scenarios}
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleOpen}>Open</Button>
      </ModalFooter>
      </Modal>
    )
  }
}
