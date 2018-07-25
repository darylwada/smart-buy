import React, { Component } from 'react'
import { Row } from 'reactstrap'

const styles = {
  row: {
    width: '100%',
    minHeight: '500px',
    padding: '0 50px'
  },
  chart: {
    height: '450px',
    width: '1050px'
  }
}

export default class DataTable extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.updateCanvas()
  }

  updateCanvas() {
    const data = {}
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Years'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Net Equity'
          }
        }]
      }
    }
    const ctx = this.refs.canvas.getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    })
  }

  render() { 
    const { netEquity, investment } = this.props
    return (
      <Row style={styles.row}>
        <div className="box">
          <canvas ref="canvas" id="chart" style={styles.chart}>
          </canvas>
        </div>
      </Row>
    )
}

}