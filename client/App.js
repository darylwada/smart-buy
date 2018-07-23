import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './components/Wizard'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      wizardView: 'mortgage',
      mortgage: {
        purchasePrice: 0,
        interestRate: 0,
        monthlyMortgage: 0,
        downPayment: 0,
        term: 0,
        closingCosts: 0
      },
      expenses: {
        propertyTax: 0,
        hoa: 0,
        maintenance: 0,
        insurance: 0
      },
      rates: {
        annualAppreciation: 0,
        incomeTaxRate: 0,
        generalInflation: 0
      },
      rent: {
        rent: 0,
        rentInflation: 0,
        rentReturn: 0
      }
    })
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const field = event.target.id
    const value = event.target.value
    const wizardView = this.state.wizardView
    const state = Object.assign({}, this.state[wizardView], { [field]: parseInt(value, 10) })
    this.setState({ [wizardView]: state })
  }

  render() {
    console.log(this.state)
    const { wizardView } = this.state
    return (
      <Container className="bg-white">
        <Header></Header>
        <Wizard 
          wizardView={wizardView} 
          inputs={this.state[wizardView]}
          handleInputChange={this.handleInputChange}></Wizard>
      </Container>
    )
  }
}


      // purchasePrice: 0,
      // interestRate: 0,
      // monthlyMortgage: 0,
      // downPayment: 0,
      // term: 0,
      // closingCosts: 0,
      // propertyTax: 0,
      // hoa: 0,
      // maintenance: 0,
      // insurance: 0,
      // annualAppreciation: 0,
      // incomeTaxRate: 0,
      // generalInflation: 0,
      // rent: 0,
      // rentInflation: 0,
      // rentReturn: 0