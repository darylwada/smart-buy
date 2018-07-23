import React from 'react'
import { Row } from 'reactstrap'
import WizardInput from './Input'
import WizardStep from './WizardStep'
import WizardButtons from './WizardButtons'

const styles = {
  row: {
    height: '300px',
    padding: '50px'
  }
}

export default function Wizard({ wizardView, inputs, handleInputChange, handleWizardButton, handleWizardTab }) {
  const map = {
    mortgage: ['Purchase Price', 'Interest Rate', 'Monthly Mortgage Payment', 'Down Payment', 'Term', 'Closing Costs'],
    expenses: ['Property Tax', 'HOA', 'Maintenance', 'Insurance'],
    rates: ['Annual Appreciation', 'Marginal Income Tax Rate', 'General Inflation'],
    rent: ['Rent of Comparable Home', 'Rental Inflation', 'Return on Cash']
  }
  const pages = Object.keys(map)
  const stateNames = Object.keys(inputs)
  return (
    <Row className="border pb-5">
      <WizardStep 
        currentPage={wizardView} 
        pages={pages}
        handleWizardTab={handleWizardTab}></WizardStep>
      <Row style={styles.row}>
        {
          map[wizardView].map((label, i) => {
            return (
              <WizardInput stateName={stateNames[i]} label={label} handleInputChange={handleInputChange} key={label}></WizardInput>
            )
          })
        }
      </Row>
      <WizardButtons handleWizardButton={handleWizardButton}></WizardButtons>
    </Row>
  )
}