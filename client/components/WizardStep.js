import React from 'react'
import { Row } from 'reactstrap'


export default function WizardStep(props) {
  const { currentPage, pages, handleWizardTab } = props
  const icons = {
    mortgage: <i className="fas fa-home"></i>,
    expenses: <i className="fas fa-money-bill-alt"></i>,
    rates: <i className="fas fa-chart-line"></i>,
    rent: <i className="fas fa-building"></i>
  }
  return (
    <Row className="justify-content-around pt-3">
      <div className="connecting-line"></div>
      {
        pages.map(page => {
          const tabClass = page === currentPage
            ? 'tab-circle active'
            : 'tab-circle'
          return (
            <span id={page} className={tabClass} onClick={handleWizardTab} key={page}>
              {icons[page]}
            </span>
          )
        })
      }

    </Row>
  )
}