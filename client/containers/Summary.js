import React, { Component, Fragment } from 'react'
import { Row, Col, Collapse } from 'reactstrap'
import getParagraph from '../util/get-paragraph';

const styles = {
  header: {
    padding: '0 50px'
  },
  row: {
    minHeight: '215px',
    padding: '0 50px'
  },
  icon: {
    color: 'rgb(133, 133, 133)',
    cursor: 'pointer',
    verticalAlign: 'middle',
    lineHeight: '24px'
  }
}

export default class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = { collapse: false }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const { netEquity, investment } = this.props.data
    const { purchasePrice, downPayment, closingCosts, rentReturn, annualAppreciationRate } = this.props.inputs
    const { collapse } = this.state
    const downPaymentAmt = (purchasePrice * downPayment / 100).toLocaleString()
    const closingCostsAmt = (purchasePrice * closingCosts / 100).toLocaleString()
    const paragraph = getParagraph(netEquity, investment, downPaymentAmt, closingCostsAmt, rentReturn, annualAppreciationRate)
    const icon = collapse
      ? 'far fa-plus-square'
      : 'far fa-minus-square'

    return (
      <Fragment>
        <Row style={styles.header}>
          <h5 className="mb-3 mr-2">Summary</h5>
          <i className={icon} style={styles.icon} onClick={this.toggle}></i>
        </Row>
        <Collapse isOpen={!this.state.collapse}>
          <Row style={styles.row}>
            <Col md="12">
              {paragraph}
            </Col>
          </Row>
        </Collapse>
      </Fragment>
    )
  }
}