import React from 'react'
import { InputGroup, Input, Col } from 'reactstrap'

export default function WizardInput(props) {
  const { label } = props
  return (
    <Col md="4" className="px-5">
      <label>{label}</label>
      <InputGroup>
        <Input type="number"></Input>
      </InputGroup>
    </Col>
  )
}