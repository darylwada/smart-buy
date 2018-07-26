import React from 'react'
import { Row, Col } from 'reactstrap'
import findBreakEven from '../util/break-even'

const styles = {
  row: {
    width: '100%',
    minHeight: '200px',
    padding: '0 50px'
  }
}

export default function Summary(props) {
  const { netEquity, investment } = props.data
  const breakEven = findBreakEven(netEquity, investment)
  return (
    <Row style={styles.row}>
      <Col md="12">
        <h5 className="text-center mb-3">Summary</h5>
        <p>After <strong>{breakEven}</strong> years, buying becomes a better financial option than renting.</p>
      </Col>
    </Row>
  )
}