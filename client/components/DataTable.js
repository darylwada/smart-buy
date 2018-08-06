import React from 'react'
import { Table, Row } from 'reactstrap'
import Tooltip from './Tooltip'

const styles = {
  colHeader: {
    textAlign: 'center',
    fontSize: '0.9em'
  },
  data: {
    fontFamily: 'arial',
    textAlign: 'center',
    fontSize: '0.9em'
  },
  bold: {
    fontWeight: 'bold'
  },
  row: {
    padding: '0 60px'
  }
}

export default function DataTable(props) {
  const { homeValue, debt, fees, netEquity, cashFlow, rent, investment } = props.data

  return (
    <Row style={styles.row}>
      <Table borderless size="sm" responsive={true}>
        <thead>
          <tr style={styles.colHeader}>
            <th>Year</th>
            <th>Home Value <Tooltip id="homeValue" /></th>
            <th>Debt <Tooltip id="debt" /></th>
            <th>Fees When Sold <Tooltip id="fees" /></th>
            <th>Home Equity <Tooltip id="equity" /></th>
            <th>Home Payments <Tooltip id="homePayments" /></th>
            <th>Comparable Rent <Tooltip id="rentPayments" /></th>
            <th>Rent Savings <Tooltip id="savings" /></th>
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
  )
}