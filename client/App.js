import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './containers/Wizard'
import DataTable from './components/DataTable'
import calculations from './util/calculations'
import Chart from './containers/Chart'
import Summary from './components/Summary'
import SectionCollapse from './containers/SectionCollapse'
import TopBar from './components/TopBar'

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
      rentReturn: 6,
      name: null,
      id: null,
      user: null
    }
  }

  handleInputChange = ({ target }) => {
    const { id, value } = target
    const unit = target.getAttribute('data-unit')
    if (unit === 'percent') {
      this.setState({ [id]: parseFloat(value, 10) || 0 })
    }
    else {
      const valueNum = parseInt(value.replace(',', ''), 10)
      this.setState({ [id]: valueNum || 0 })
    }
  }

  handleScenarioOpen = scenario => {
    this.setState(scenario)
  }

  clearScenarioName = () => {
    this.setState({ name: null, id: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  render() {
    console.log(this.state.user)
    const data = calculations.forecastAnnualEquity(this.state)
    return (
      <Container className="border-right border-left pb-4 bg-white">
        <TopBar setUser={this.setUser} user={this.state.user}>
        </TopBar>
        <Header 
          inputs={this.state} 
          handleScenarioOpen={this.handleScenarioOpen} 
          clearScenarioName={this.clearScenarioName}
          currentScenario={{ name: this.state.name, id: this.state.id }}></Header>
        <Wizard 
          inputs={this.state}
          handleInputChange={this.handleInputChange}>
        </Wizard>
        <SectionCollapse header="Chart">
          <Chart data={data}></Chart>
        </SectionCollapse>
        <SectionCollapse header="Summary">
          <Summary data={data} inputs={this.state}></Summary>
        </SectionCollapse>
        <SectionCollapse header="Details">
          <DataTable data={data}></DataTable>
        </SectionCollapse>
      </Container>
    )
  }
}
