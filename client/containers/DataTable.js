import React, { Component, Fragment } from 'react'
import { Table, Row, Collapse } from 'reactstrap'

const styles = {
  header: {
    padding: '0 50px'
  },
  colHeader: {
    textAlign: "center"
  },
  data: {
    fontFamily: "arial",
    textAlign: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  row: {
    padding: '0 60px'
  },
  icon: {
    color: 'rgb(133, 133, 133)',
    cursor: 'pointer',
    verticalAlign: 'middle',
    lineHeight: '24px'
  }
}

export default class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = { collapse: false }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const { homeValue, debt, fees, netEquity, cashFlow, rent, investment } = this.props.data
    const icon = this.state.collapse
    ? 'far fa-plus-square'
    : 'far fa-minus-square'

    return (
      <Fragment>
        <Row style={styles.header}>
          <h5 className="mb-3 mr-2">Details</h5>
          <i className={icon} style={styles.icon} onClick={this.toggle}></i>
        </Row>
        <Collapse isOpen={!this.state.collapse}>
          <Row style={styles.row}>
            <Table borderless size="sm">
              <thead>
                <tr style={styles.colHeader}>
                  <th>Year</th>
                  <th>Home Value</th>
                  <th>Debt</th>
                  <th>Fees When Sold</th>
                  <th>Home Equity</th>
                  <th>Home Payments</th>
                  <th>Comparable Rent</th>
                  <th>Rent Savings</th>
                </tr>
              </thead>
              <tbody>
                {
                  homeValue.map((value, i) => {
                    return (
                      <tr style={styles.data} className={i % 2 === 0 ? 'bg-light-gray' : 'bg-white'} key={i}>
                        <td>{i}</td>
                        <td>{value.toLocaleString()}</td>
                        <td>{debt[i].toLocaleString()}</td>
                        <td>{fees[i].toLocaleString()}</td>
                        <td style={styles.bold}>{netEquity[i].toLocaleString()}</td>
                        <td>{cashFlow[i].toLocaleString()}</td>
                        <td>{rent[i].toLocaleString()}</td>
                        <td style={styles.bold}>{investment[i].toLocaleString()}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Row>
        </Collapse>
      </Fragment>
    )
  }
}