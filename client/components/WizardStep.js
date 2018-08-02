import React from 'react'
import { Col } from 'reactstrap'
import ReactTooltip from 'react-tooltip'

const styles = {
  tabTooltip: {
    lineHeight: '1em',
    marginBottom: '0'
  }
}

export default function WizardStep({ activeTab, tabs, handleTabClick }) {
  const icons = {
    mortgage: <i className="fas fa-home"></i>,
    expenses: <i className="fas fa-money-bill-alt"></i>,
    rates: <i className="fas fa-chart-line"></i>,
    rent: <i className="fas fa-building"></i>
  }
  return (
    <Col md="12" className="d-flex justify-content-around mb-5">
      <div className="connecting-line"></div>
      {
        tabs.map(tab => {
          const tabClass = tab === activeTab
            ? 'tab-circle active'
            : 'tab-circle'
          const tooltipText = tab[0].toUpperCase() + tab.substring(1)
          return (
            <span data-tip data-for={tab} id={tab} className={tabClass} onClick={handleTabClick} key={tab}>
              {icons[tab]}
              <ReactTooltip id={tab} effect="solid">
                <p style={styles.tabTooltip}>{tooltipText}</p>
              </ReactTooltip>
            </span>
          )
        })
      }
    </Col>
  )
}