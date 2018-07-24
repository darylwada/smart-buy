import React from 'react'
import { Table } from 'reactstrap'


export default function DataTable(props) {
  console.log(props) 
  return (
    <Table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Home Value</th>
          <th>Debt</th>
          <th>Home Equity</th>
          <th>Fees When Sold</th>
          <th>Net Equity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>

        </tr>
        <tr>
          <th scope="row">2</th>

        </tr>
        <tr>
          <th scope="row">3</th>

        </tr>
      </tbody>
      </Table>
  )
}