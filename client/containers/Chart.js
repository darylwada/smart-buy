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
    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.updateChart()
  }

  createChart() {
    const { years, netEquity, investment } = this.props.data
    
    const data = {
      labels: years,
      datasets: [
        {
          label: 'Home Equity',
          data: netEquity,
          borderColor: 'rgb(55, 165, 229)',
          backgroundColor: 'rgba(55, 165, 229, 0.05)',
          pointRadius: 0
        },
        {
          label: 'Rent Equity',
          data: investment,
          borderColor: 'rgb(43, 70, 96)',
          backgroundColor: 'rgba(43, 70, 96, 0.05)',
          pointRadius: 0
        }
      ]
    }
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          display: true,
          gridLines: { display: false },
          scaleLabel: {
            display: true,
            labelString: 'Years'
          }
        }],
        yAxes: [{
          display: true,
          gridLines: { display: false },
          scaleLabel: {
            display: true,
            labelString: 'Net Equity'
          },
          ticks: {
            callback: value => value.toLocaleString()
          }
        }]
      }
    }
    const ctx = this.refs.canvas.getContext('2d');
    window.lineChart = new Chart(ctx, {
      type: 'line',
      data,
      options
    })
  }

  updateChart() {
    const { netEquity, investment } = this.props.data
    const { datasets } = window.lineChart.config.data
    datasets[0].data = datasets[0].data.map((value, i) => netEquity[i])
    datasets[1].data = datasets[1].data.map((value, i) => investment[i])
    window.lineChart.update()
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