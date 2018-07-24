import React from 'react'
import { InputGroup, Input, Col } from 'reactstrap'

export default function WizardInput({ inputName, inputValue, handleInputChange }) {
  const labelMap = {
    purchasePrice: 'Purchase Price',
    interestRate: 'Mortgage Interest Rate',
    monthlyMortgage: 'Calculated Monthly Mortgage',
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
        <Input id={inputName} type="number" step="0.001" value={inputValue} onChange={handleInputChange}></Input>
      </InputGroup>
    </Col>
  )
}