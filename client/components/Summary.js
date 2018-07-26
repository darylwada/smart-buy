import React from 'react'
import { Row, Col } from 'reactstrap'
import getParagraph from '../util/get-paragraph';

const styles = {
  row: {
    width: '100%',
    minHeight: '250px',
    padding: '0 50px'
  }
}

export default function Summary(props) {
  const { netEquity, investment } = props.data
  const { purchasePrice, downPayment, closingCosts, rentReturn, annualAppreciationRate } = props.inputs
  const downPaymentAmt = (purchasePrice * downPayment / 100).toLocaleString()
  const closingCostsAmt = (purchasePrice * closingCosts / 100).toLocaleString()
  const paragraph = getParagraph(netEquity, investment, downPaymentAmt, closingCostsAmt, rentReturn, annualAppreciationRate)

  return (
    <Row style={styles.row}>
      <Col md="12">
        <h5 className="text-center mb-3">Summary</h5>
        {paragraph}
      </Col>
    </Row>
  )
}