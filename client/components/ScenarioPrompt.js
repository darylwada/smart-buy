import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function ScenarioPrompt(props) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader>Invalid Input</ModalHeader>
      <ModalBody>Please enter a name for this scenario.</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggleNested}>OK</Button>
      </ModalFooter>
    </Modal>
  )
}