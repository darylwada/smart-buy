import React from 'react'
import { Row, Col } from 'reactstrap'
import findBreakEven from '../util/break-even'

const styles = {
  row: {
    width: '100%',
    minHeight: '250px',
    padding: '0 50px'
  }
}

export default function Summary(props) {
  const { netEquity, investment } = props.data
  const { purchasePrice, downPayment, closingCosts, rentReturn } = props.inputs
  const downPaymentAmt = (purchasePrice * downPayment / 100).toLocaleString()
  const closingCostsAmt = (purchasePrice * closingCosts / 100).toLocaleString()
  const breakEven = findBreakEven(netEquity, investment)
  return (
    <Row style={styles.row}>
      <Col md="12">
        <h5 className="text-center mb-3">Summary</h5>
        <p>After <strong>{breakEven}</strong> years, buying becomes a better financial option than renting. If you sell before
          then, the fees from buying and selling would offset the financial benefits of owning a home over time.
        </p>
        <p>The initial down payment of <strong>${downPaymentAmt}</strong> and closing costs of <strong>${closingCostsAmt}
          </strong> can be invested at a <strong>{rentReturn}%</strong> rate of return if you rented instead, giving you
          more equity in the short term.
        </p>
        <p>Home ownership equity catches up to your rent savings as time passes due to monthly mortgage payments increasingly going towards
          principal rather than interest, and from tax decutions you can claim as a home owner.
        </p>
      </Col>
    </Row>
  )
}