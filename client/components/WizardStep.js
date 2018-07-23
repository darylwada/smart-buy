import React from 'react'
import { Col } from 'reactstrap'


export default function WizardStep({ activeTab, tabs, handleTabClick }) {
  const icons = {
    mortgage: <i className="fas fa-home"></i>,
    expenses: <i className="fas fa-money-bill-alt"></i>,
    rates: <i className="fas fa-chart-line"></i>,
    rent: <i className="fas fa-building"></i>
  }
  return (
    <Col md="12" className="d-flex justify-content-around mt-5">
      <div className="connecting-line"></div>
      {
        tabs.map(tab => {
          const tabClass = tab === activeTab
            ? 'tab-circle active'
            : 'tab-circle'
          return (
            <span id={tab} className={tabClass} onClick={handleTabClick} key={tab}>
              {icons[tab]}
            </span>
          )
        })
      }
    </Col>
  )
}