import React from 'react'
import { Table } from 'reactstrap'

const styles = {
  header: {
    textAlign: "center"
  },
  data: {
    fontFamily: "arial",
    textAlign: "center"
  },
  bold: {
    fontWeight: "bold"
  }
}

export default function DataTable({ data }) {
  const { homeValue, debt, fees, netEquity, cashFlow, rent, investment } = data
  return (
    <Table borderless size="sm">
      <thead>
        <tr style={styles.header}>
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
  )
}