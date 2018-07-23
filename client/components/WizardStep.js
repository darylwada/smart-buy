import React from 'react'
import { Col } from 'reactstrap'


export default function WizardStep({ currentPage, pages, handleWizardTab }) {
  const icons = {
    mortgage: <i className="fas fa-home"></i>,
    expenses: <i className="fas fa-money-bill-alt"></i>,
    rates: <i className="fas fa-chart-line"></i>,
    rent: <i className="fas fa-building"></i>
  }
  return (
    <Col className="d-flex justify-content-around mt-5">
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
    </Col>
  )
}