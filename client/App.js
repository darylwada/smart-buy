import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './containers/Wizard'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      purchasePrice: 0,
      interestRate: 0,
      monthlyMortgage: 0,
      downPayment: 0,
      term: 0,
      closingCosts: 0,
      propertyTax: 0,
      hoa: 0,
      maintenance: 0,
      insurance: 0,
      annualAppreciation: 0,
      incomeTaxRate: 0,
      generalInflation: 0,
      rent: 0,
      rentInflation: 0,
      rentReturn: 0
    })
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange({ target }) {
    const { id, value } = target
    this.setState({ [id]: parseInt(value, 10) })
  }

  render() {
    return (
      <Container className="container-fluid bg-white">
        <Header></Header>
        <Wizard 
          inputs={this.state}
          handleInputChange={this.handleInputChange}></Wizard>
      </Container>
    )
  }
}
