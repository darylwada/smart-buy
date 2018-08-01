import React, { Component, Fragment } from 'react'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

const styles = {
  tooltip: {
    color: 'rgb(133, 133, 133)'
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
    'any monthly savings as a result of lower monthly expenses.'
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
        <i id={id} className="far fa-question-circle" style={styles.tooltip} onMouseEnter={this.toggle} onMouseLeave={this.toggle}></i>
        <Popover placement="top" isOpen={this.state.tooltipOpen} target={id}>
          <PopoverHeader>More Info</PopoverHeader>
          <PopoverBody>{tooltipText[id]}</PopoverBody>
        </Popover>
      </Fragment>
    )
  }
}