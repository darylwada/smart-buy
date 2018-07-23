import React from 'react'
import { InputGroup, Input, Col } from 'reactstrap'

export default function WizardInput({ inputName, handleInputChange }) {
  const labelMap = {
    purchasePrice: 'Purchase Price',
    interestRate: 'Interest Rate',
    monthlyMortgage: 'Monthly Mortgage',
    downPayment: 'Down Payment',
    term: 'Term',
    closingCosts: 'Closing Costs',
    propertyTax: 'Property Tax',
    hoa: 'Home Owner Association',
    maintenance: 'Maintenance',
    insurance: 'Insurance',
    annualAppreciation: 'Annual Appreciation',
    incomeTaxRate: 'Marginal Income Tax Rate',
    generalInflation: 'General Inflation',
    rent: 'Rent',
    rentInflation: 'Rent Inflation',
    rentReturn: 'Return on Investment'
  }
  return (
    <Col md="4" className="px-5">
      <label>{labelMap[inputName]}</label>
      <InputGroup>
        <Input id={inputName} type="number" onChange={handleInputChange}></Input>
      </InputGroup>
    </Col>
  )
}