import React from 'react'
import { Row } from 'reactstrap'

const styles = {
  row: {
    width: '100%',
    minHeight: '200px',
    padding: '0 50px'
  }
}

export default function Summary(props) {
  return (
    <Row className="justify-content-center" style={styles.row}>
      <h5>Summary</h5>
    </Row>
  )
}