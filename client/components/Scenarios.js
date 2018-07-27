import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'

export default function Scenarios(props) {
  const { isOpen, toggle, handleSave, handleChange } = props
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Scenarios</ModalHeader>
      <ModalBody>
        <label htmlFor="scenario-name">Choose a name for this scenario:</label>
        <Input id="scenario-name" onChange={handleChange}></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Save</Button>
      </ModalFooter>
    </Modal>
  )
}