import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './containers/Wizard'
import DataTable from './components/DataTable'
import getForecastData from './util/calculations'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasePrice: 500000,
      interestRate: 4.5,
      downPayment: 20,
      closingCosts: 3,
      salesCommission: 6,
      propertyTaxRate: 1.25,
      hoa: 400,
      maintenance: 100,
      insurance: 100,
      annualAppreciationRate: 3,
      incomeTaxRate: 25,
      generalInflationRate: 2,
      rentBase: 2500,
      rentInflationRate: 2,
      rentReturn: 6
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange({ target }) {
    const { id, value } = target
    const unit = target.getAttribute('data-unit')
    if (unit === 'percent') {
      this.setState({ [id]: parseFloat(value, 10) })
    }
    else {
      const valueNum = parseInt(value.replace(',', ''), 10)
      this.setState({ [id]: valueNum })
    }
  }

  render() {
    console.log(this.state)
    const data = getForecastData(this.state)
    return (
      <Container className="border-right border-left pb-1 bg-white">
        <Header></Header>
        <Wizard 
          inputs={this.state}
          handleInputChange={this.handleInputChange}>
        </Wizard>
        <DataTable data={data}></DataTable>
      </Container>
    )
  }
}
