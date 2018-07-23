import React from 'react'
import { InputGroup, Input, Col } from 'reactstrap'

export default function WizardInput(props) {
  const { stateName, label, handleInputChange } = props
  return (
    <Col md="4" className="px-5">
      <label>{label}</label>
      <InputGroup>
        <Input id={stateName} type="number" onChange={handleInputChange}></Input>
      </InputGroup>
    </Col>
  )
}