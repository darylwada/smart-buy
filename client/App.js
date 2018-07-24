import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './containers/Wizard'
import DataTable from './components/DataTable'
import * as calculations from './util/calculations'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purchasePrice: 500000,
      interestRate: 0.045,
      monthlyMortgage: 0,
      downPayment: 0.20,
      salesCommission: 0.06,
      closingCosts: 0.03,
      propertyTax: 0.0125,
      hoa: 400,
      maintenance: 100,
      insurance: 100,
      annualAppreciation: 0.03,
      incomeTaxRate: 0.25,
      generalInflation: 0.02,
      rent: 0,
      rentInflation: 0,
      rentReturn: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange({ target }) {
    const { id, value } = target
    const unit = target.getAttribute('data-unit')
    if (unit === 'percent') {
      this.setState({ [id]: parseFloat(value / 100, 10) || '' })
    }
    else {
      const valueNum = parseInt(value.replace(',', ''), 10)
      this.setState({ [id]: valueNum || '' })
    }
  }

  render() {
    console.log(this.state)
    const calcs = calculations.forecastBuyScenarioAnnual(this.state)
    return (
      <Container className="container-fluid bg-white">
        <Header></Header>
        <Wizard 
          inputs={this.state}
          handleInputChange={this.handleInputChange}>
        </Wizard>
        <DataTable calcs={calcs}></DataTable>
      </Container>
    )
  }
}
