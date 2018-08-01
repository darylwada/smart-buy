import React, { Component, Fragment } from 'react'
import { Row, Collapse } from 'reactstrap'

const styles = {
  header: {
    padding: '0 50px'
  },
  icon: {
    color: 'rgb(133, 133, 133)',
    cursor: 'pointer',
    verticalAlign: 'middle',
    lineHeight: '24px'
  }
}

export default class SectionCollapse extends Component {
  constructor(props) {
    super(props)
    this.state = { collapse: false }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const { collapse } = this.state
    const { header, children } = this.props
    const { toggle } = this
    const icon = collapse
      ? 'far fa-plus-square'
      : 'far fa-minus-square'

    return (
      <Fragment>
        <Row style={styles.header}>
          <h5 className="mb-3 mr-2">{header}</h5>
          <i className={icon} style={styles.icon} onClick={toggle}></i>
        </Row>
        <Collapse isOpen={!collapse}>
          {children}
        </Collapse>
      </Fragment>
    )
  }
}