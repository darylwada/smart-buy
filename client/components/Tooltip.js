import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'

const styles = {
  tooltipIcon: {
    color: 'rgb(133, 133, 133)'
  },
  tooltipText: {
    maxWidth: '200px', 
    textAlign: 'left', 
    marginBottom: '0'
  }
}

const tooltipText = {
  purchasePrice: 'Price of your target home',
  interestRate: 'Interest rate for a 30-year fixed-rate mortgage.',
  downPayment: 'Percent of the purchase price that you will pay up front, most commonly 20%.',
  closingCosts: 'Fees of closing the purchase, typically 2-5% of the purchase price.',
  salesCommission: 'Fees of closing the sale, typically 5-6% of the selling price of the home.',
  propertyTaxRate: 'Your state\'s property tax rate.',
  hoa: 'Any housing association fees, most common in condos and townhouses.',
  maintenance: 'Your expected cost to make repairs or improvements for your home.',
  insurance: 'The cost of homeowners insurance, which is required by most loans.',
  annualAppreciationRate: 'The expected rate at which your home value will appreciate each year.',
  incomeTaxRate: 'Your income tax bracket, used to determine how much of your mortgage interest payments you can deduct.',
  generalInflationRate: 'The rate of inflation for HOA fees, maintenance, and insurance.',
  rentBase: 'Monthly rent of a property comparable to your target home.',
  rentInflationRate: 'The rate at which rent will increase per year.',
  rentReturn: 'The rate at which any savings you have from renting will grow through investing.',
  homeValue: 'Projected value of your home after factoring in appreciation, compounded monthly.',
  debt: 'Debt remaining on your loan. Each mortgage payment reduced the debt until it is fully paid off after 30 years.',
  fees: 'Estimated fees of selling your home as a percentage of your home value at the time of sale.',
  equity: 'Your equity from owning a home net of selling fees.',
  homePayments: 'Your yearly payments to live in a home. This number includes payments on your mortgage, property tax, ' +
    'HOA, maintenance, and insurance, all of which except your mortgage are assumed to inflate over time.',
  rentPayments: 'Your yearly rent payments if you rented a comparable home, inflated over time.',
  savings: 'The amount you could save and invest elsewhere if you rented, which includes what you would have spent on a downpayment, closing costs, and ' +
    'any savings as a result of lower monthly expenses.'
}

export default function Tooltip(props) {
  const { id } = props
  return (
    <Fragment>
      <a data-tip data-for={id}>
        <i className="far fa-question-circle" style={styles.tooltipIcon}></i>
      </a>
      <ReactTooltip id={id}>
        <p style={styles.tooltipText}>{tooltipText[id]}</p>
      </ReactTooltip>
    </Fragment>
  )
}
