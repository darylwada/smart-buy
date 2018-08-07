import React from 'react'
import { Row, Col } from 'reactstrap'
import Paragraph from './Paragraph';

const styles = {
  row: {
    minHeight: '215px',
    padding: '0 50px'
  }
}

export default function Summary(props) {
  const { netEquity, investment } = props.data
  const { purchasePrice, downPayment, closingCosts, rentReturn, annualAppreciationRate } = props.inputs
  const downPaymentAmt = (purchasePrice * downPayment / 100).toLocaleString()
  const closingCostsAmt = (purchasePrice * closingCosts / 100).toLocaleString()

  return (
    <Row style={styles.row}>
      <Col md="12">
        <Paragraph
          netEquity={netEquity}
          investment={investment}
          downPaymentAmt={downPaymentAmt}
          closingCostsAmt={closingCostsAmt}
          rentReturn={rentReturn}
          annualAppreciationRate={annualAppreciationRate}>
        </Paragraph>
      </Col>
    </Row>
  )
}