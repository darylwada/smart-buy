import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'

export default function Scenarios(props) {
  const { isOpen, toggle } = props
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Save current scenario</ModalHeader>
      <ModalBody>
        <Input></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Save</Button>
      </ModalFooter>
    </Modal>
  )
}