import React, { Fragment } from 'react'
import { Col, Button } from 'reactstrap'

const styles = {
  btnWidth: {
    width: '100px',
    margin: '0 50px'
  }
}

export default function WizardButtons({ handleWizardButton }) {
  return (
    <Fragment>
    <Col md="6">
     <Button id="previous" color="primary" style={styles.btnWidth} onClick={handleWizardButton}>Previous</Button>
    </Col>
    <Col md="6" className="d-flex justify-content-end">
      <Button id="next" color="primary" style={styles.btnWidth} onClick={handleWizardButton}>Next</Button>
    </Col>
    </Fragment>
  )
}