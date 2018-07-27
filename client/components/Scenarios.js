import React from 'react'
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

export default function Scenarios(props) {
  const { isOpen, toggle, handleSave, handleChange, savedScenarios } = props
  const $scenarios = savedScenarios.map((scenario, i) => {
    return (
      <ListGroupItem className="border-0" style={styles.scenario} key={i}>{scenario.scenario}</ListGroupItem>
    )
  })
  return (
    <Modal size="lg" isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Scenarios</ModalHeader>
      <ModalBody>
        <ListGroup className="border mb-3" style={styles.scenariosList}>
          {$scenarios}
        </ListGroup>
        <label htmlFor="scenario-name">Choose a name for this scenario:</label>
        <Input id="scenario-name" onChange={handleChange}></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Save</Button>
      </ModalFooter>
    </Modal>
  )
}