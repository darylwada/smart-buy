import React from 'react'
import { Row } from 'reactstrap'
import WizardInput from './Input'

const styles = {
  row: {
    height: '300px',
    padding: '50px'
  }
}

export default function Wizard(props) {
  const map = {
    mortgage: ['Purchase Price', 'Interest Rate', 'Monthly Mortgage Payment', 'Down Payment', 'Term', 'Closing Costs'],
    expenses: ['Property Tax', 'HOA', 'Maintenance', 'Insurance'],
    rates: ['Annual Appreciation', 'Marginal Income Tax Rate', 'General Inflation'],
    rent: ['Rent of Comparable Home', 'Rental Inflation', 'Return on Cash']
  }
  const { wizardView } = props
  return (
    <Row style={styles.row}>
      {
        map[wizardView].map(label => {
          return (
            <WizardInput label={label} key={label}></WizardInput>
          )
        })
      }
    </Row>
  )
}