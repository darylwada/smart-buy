import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function Save(props) {
  const { inputs, toggleSave, isOpen, currentScenario } = props

  const handleOverwrite = () => {
    const { id } = currentScenario
    const req = {
      method: 'PUT',
      body: JSON.stringify(inputs),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(`/scenarios/${id}`, req)
      .then(res => res.ok ? res.json() : null)
      .then(scenario => scenario && toggleSave())
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Overwrite?</ModalHeader>
      <ModalBody>Are you sure you want to overwrite scenario <strong>{currentScenario.name}</strong>?</ModalBody>
      <ModalFooter>
        <Button outline color="success" onClick={handleOverwrite}><i className="fas fa-check"></i></Button>
        <Button outline color="danger" onClick={toggleSave}><i className="fas fa-times"></i></Button>
      </ModalFooter>
    </Modal>
  )
}