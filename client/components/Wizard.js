import React from 'react'
import { Row } from 'reactstrap'
import Input from './Input'

export default function Wizard(props) {
  const map = {
    mortgage: ['Purchase Price', 'Interest Rate', 'Monthly Mortgage Payment', 'Down Payment', 'Term', 'Closing Costs'],
    expenses: ['Property Tax', 'HOA', 'Maintenance', 'Insurance'],
    rates: ['Annual Appreciation', 'Marginal Income Tax Rate', 'General Inflation'],
    rent: ['Rent of Comparable Home', 'Rental Inflation', 'Return on Cash']
  }
  const { wizardView } = this.props
  return (
    <Row className="fixed-height-500">

    </Row>
  )
}