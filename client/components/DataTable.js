import React from 'react'
import { Table, Row } from 'reactstrap'
import Tooltip from '../containers/Tooltip'

const styles = {
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
  tooltip: {
    color: 'rgb(133, 133, 133)'
  }
}

export default function DataTable(props) {
  const { homeValue, debt, fees, netEquity, cashFlow, rent, investment } = props.data

  return (
    <Row style={styles.row}>
      <Table borderless size="sm">
        <thead>
          <tr style={styles.colHeader}>
            <th>Year</th>
            <th>Home Value <Tooltip id="table-value" /></th>
            <th>Debt <Tooltip id="table-debt" /></th>
            <th>Fees When Sold <Tooltip id="table-fees" /></th>
            <th>Home Equity <Tooltip id="table-equity" /></th>
            <th>Home Payments <Tooltip id="table-payments" /></th>
            <th>Comparable Rent <Tooltip id="table-rent" /></th>
            <th>Rent Savings <Tooltip id="table-savings" /></th>
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