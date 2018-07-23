import React from 'react'
import { Row, Col, Button } from 'reactstrap'


export default function WizardStep(props) {
  const { currentPage, pages, handleWizardTab } = props
  return (
    <Row className="justify-content-around pt-3">
      <div className="connecting-line"></div>
      {
        pages.map(page => {
          if (page === currentPage) {
            return <span id={page} className="tab-circle active" key={page}></span>
          }
          else {
            return <span id={page} className="tab-circle" onClick={handleWizardTab} key={page}></span>
          }
        })
      }

    </Row>
  )
}