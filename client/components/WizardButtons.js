import React, { Fragment } from 'react'
import { Col, Button } from 'reactstrap'

const styles = {
  btnWidth: {
    minWidth: '100px',
    margin: '0 50px'
  }
}

export default function WizardButtons({ activeTab, handleButtonClick }) {
  let showPrevious = true
  let showNext = true
  if (activeTab === 'mortgage') showPrevious = false
  if (activeTab === 'rent') showNext = false
  return (
    <Fragment>
    <Col xs="6">
      <Button 
        id="previous" 
        className={showPrevious ? 'visible' : 'invisible'} 
        color="primary" style={styles.btnWidth} 
        onClick={handleButtonClick}>
        Previous
    </Button>
    </Col>
    <Col xs="6" className="d-flex justify-content-end">
      <Button 
        id="next" 
        className={showNext ? 'visible' : 'invisible'} 
        color="primary" 
        style={styles.btnWidth} 
        onClick={handleButtonClick}>
        Next
      </Button>
    </Col>
    </Fragment>
  )
}