import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function Confirm(props) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>Overwrite?</ModalHeader>
      <ModalBody>Are you sure you want to overwrite scenario <strong>{props.newScenarioName}</strong>?</ModalBody>
      <ModalFooter>
        <Button outline color="success" onClick={props.handleSave}><i id="overwrite" className="fas fa-check"></i></Button>
        <Button outline color="danger" onClick={props.toggleConfirm}><i className="fas fa-times"></i></Button>
      </ModalFooter>
    </Modal>
  )
}