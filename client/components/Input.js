import React from 'react'
import { InputGroup, InputGroupAddon, Input, Col } from 'reactstrap'

export default function WizardInput({ inputGroupAttributes, inputName, inputValue, handleInputChange }) {
  const { label, addon, symbol, step, max } = inputGroupAttributes
  const $input = addon === 'prepend'
    ? <InputGroup>
        <InputGroupAddon addonType={addon}>{symbol}</InputGroupAddon>
        <Input 
          id={inputName} 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange}>
        </Input>
      </InputGroup>
    : <InputGroup>
        <Input 
          id={inputName} 
          data-unit='percent'
          step={step}
          min="0"
          max={max}
          type="number" 
          value={inputValue} 
          onChange={handleInputChange}>
        </Input>
        <InputGroupAddon addonType={addon}>{symbol}</InputGroupAddon>
      </InputGroup>

  return (
    <Col md="4" className="px-5">
      <label>{label}</label>
      {$input}
    </Col>
  )
}