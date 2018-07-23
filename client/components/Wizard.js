import React, { Fragment } from 'react'
import { Row, Col, Button } from 'reactstrap'
import WizardInput from './Input'
import WizardStep from './WizardStep'

const styles = {
  row: {
    height: '300px',
    padding: '50px'
  },
  btnWidth: {
    width: '100px'
  }
}

export default function Wizard(props) {
  const map = {
    mortgage: ['Purchase Price', 'Interest Rate', 'Monthly Mortgage Payment', 'Down Payment', 'Term', 'Closing Costs'],
    expenses: ['Property Tax', 'HOA', 'Maintenance', 'Insurance'],
    rates: ['Annual Appreciation', 'Marginal Income Tax Rate', 'General Inflation'],
    rent: ['Rent of Comparable Home', 'Rental Inflation', 'Return on Cash']
  }
  const pages = Object.keys(map)
  const { wizardView, inputs, handleInputChange, handleWizardButton, handleWizardTab } = props
  const stateNames = Object.keys(inputs)
  return (
    <div>
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
    <Row className="p-3">
      <Col md="6">
        <Button id="previous" color="primary" onClick={handleWizardButton}>Previous</Button>
      </Col>
      <Col md="6" className="d-flex justify-content-end">
        <Button id="next" color="primary" style={styles.btnWidth} onClick={handleWizardButton}>Next</Button>
      </Col>
    </Row>
    </div>
  )
}