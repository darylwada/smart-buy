import React, { Component, Fragment } from 'react'
import { Popover, PopoverBody } from 'reactstrap'

const styles = {
  tooltipIcon: {
    color: 'rgb(133, 133, 133)'
  },
  tooltip: {
    transition: 'all 2s ease-in'
  }
}

const tooltipText = {
  'table-value': 'Projected value of your home after factoring in appreciation, compounded monthly.',
  'table-debt': 'Debt remaining on your loan. Debt gets reduced with each mortgage payment until it is fully paid off after 30 years.',
  'table-fees': 'Estimated fees of selling your home, based on a percentage of your home value.',
  'table-equity': 'Your net equity from owning a home after accouting for selling fees.',
  'table-payments': 'Your yearly payments to live in a home. This number includes your payments on your mortgage, property tax, ' +
    'HOA, maintenance, and insurance, all of which except your mortgage are assumed to inflate over time.',
  'table-rent': 'Your yearly rent payments if you rented a comparable home. The payments include rental inflation over time, compounded monthly.',
  'table-savings': 'The amount you could save and invest elsewhere if you rented, which includes what you would have spent on a downpayment, closing costs, and ' +
    'any monthly savings as a result of lower monthly expenses.',
  purchasePrice: 'Price of your target home',
  interestRate: 'Interest rate for a 30-year fixed-rate mortgage.',
  downPayment: 'Percent of purchase price you want to pay up front, most commonly 20%.',
  closingCosts: 'The fees incurred when closing the purchase, typically 2-5% of the purchase price.',
  salesCommission: 'The fees incurred when closing the sale, typically 5-6% of the selling price of the home.',
  propertyTaxRate: 'Your state\'s property tax rate (national average is 1.2%).',
  hoa: 'Any housing association fees, common in condos and townhouses.',
  maintenance: 'Your expected cost to make repairs or improvements for your home.',
  insurance: 'The cost of staying insured, as is required by most loans.',
  annualAppreciationRate: 'The expected rate at which your home value increases per year.',
  incomeTaxRate: 'Your income tax bracket, used to determine how much of your mortgage interest payments you can deduct.',
  generalInflationRate: 'The rate of inflation for HOA fees, maintenance, and insurance.',
  rentBase: 'Monthly rent of a place comparable to your target home.',
  rentInflationRate: 'The Rate at which rent will increase per year.',
  rentReturn: 'The rate at which any savings you have from renting will grow through investing.'
}

export default class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = { tooltipOpen: false }
  }

  toggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  render() {
    const { id } = this.props
    return (
      <Fragment>
        <i id={id} className="far fa-question-circle" style={styles.tooltipIcon} onMouseEnter={this.toggle} onMouseLeave={this.toggle}></i>
        <Popover placement="top" isOpen={this.state.tooltipOpen} target={id} style={styles.tooltip}>
          <PopoverBody>{tooltipText[id]}</PopoverBody>
        </Popover>
      </Fragment>
    )
  }
}

