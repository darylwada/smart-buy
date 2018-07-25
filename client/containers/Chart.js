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
    this.updateCanvas = this.updateCanvas.bind(this)
  }

  componentDidMount() {
    this.updateCanvas()
  }

  updateCanvas() {
    const { years, netEquity, investment } = this.props.data
    console.log(netEquity)
    
    const data = {
      labels: years,
      datasets: [
        {
          label: 'Home Equity',
          data: netEquity,
          borderColor: 'rgb(55, 165, 229)',
          backgroundColor: 'rgba(55, 165, 229, 0.05)'
        },
        {
          label: 'Rent Equity',
          data: investment,
          borderColor: 'rgb(43, 70, 96)',
          backgroundColor: 'rgba(43, 70, 96, 0.05)'
        }
      ]
    }
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