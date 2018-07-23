import React from 'react'
import { InputGroup, Input } from 'reactstrap'

export default function Input(props) {
  const { label } = this.props
  return (
    <label>{label}</label>
    <InputGroup>
      <Input type="number"></Input>
    </InputGroup>
  )
}