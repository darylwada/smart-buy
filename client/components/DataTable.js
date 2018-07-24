import React from 'react'
import { Table } from 'reactstrap'

const styles = {
  header: {
    textAlign: "center"
  },
  data: {
    fontFamily: "arial",
    textAlign: "center"
  }
}

export default function DataTable({ calcs }) {
  const { homeValue, debt, equity, fees, netEquity } = calcs
  return (
    <Table borderless size="sm">
      <thead>
        <tr style={styles.header}>
          <th>Year</th>
          <th>Home Value</th>
          <th>Debt</th>
          <th>Home Equity</th>
          <th>Fees When Sold</th>
          <th>Net Equity</th>
        </tr>
      </thead>
      <tbody>
        {
          homeValue.map((value, i) => {
            return (
              <tr style={styles.data} className={i % 2 === 0 ? 'tr-striped' : ''} key={i}>
                <td>{i}</td>
                <td>{value.toLocaleString()}</td>
                <td>{debt[i].toLocaleString()}</td>
                <td>{equity[i].toLocaleString()}</td>
                <td>{fees[i].toLocaleString()}</td>
                <td>{netEquity[i].toLocaleString()}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}