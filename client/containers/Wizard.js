import React, { Component } from 'react'
import { Row } from 'reactstrap'
import WizardInput from '../components/Input'
import WizardStep from '../components/WizardStep'
import WizardButtons from '../components/WizardButtons'
import inputGroupMap from '../util/input-group-map'


const styles = {
  row: {
    width: '100%',
    minHeight: '200px',
    padding: '0 50px'
  }
}

export default class Wizard extends Component {
  constructor(props) {
    super(props)
    this.state = ({ activeTab: 'mortgage' })

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleButtonClick({ target }) {
    const tabs = ['mortgage', 'expenses', 'rates', 'rent']
    let currentIndex = tabs.findIndex(tab => tab === this.state.activeTab)
    if (target.id === 'next') {
      currentIndex++
      this.setState({ activeTab: tabs[currentIndex++]})
    }
    if (target.id === 'previous') {
      currentIndex--
      this.setState({ activeTab: tabs[currentIndex--]})
    }
  }

  handleTabClick({ target }) {
    const $tab = target.closest('.tab-circle')
    this.setState({ activeTab: $tab.id })
  }

  render() {
    const { inputs, handleInputChange } = this.props
    const { activeTab } = this.state
    const inputNames = Object.keys(inputs)
    const inputsByTab = {
      mortgage: inputNames.slice(0, 6),
      expenses: inputNames.slice(6, 10),
      rates: inputNames.slice(10, 13),
      rent: inputNames.slice(13, 16)
    }
    const tabs = Object.keys(inputsByTab)
    return (
      <Row className="border pb-5">
        <WizardStep 
          activeTab={activeTab} 
          tabs={tabs}
          handleTabClick={this.handleTabClick}>
        </WizardStep>
        <Row style={styles.row} className="no-gutters">
          {
            inputsByTab[activeTab].map(inputName => {
              return (
                <WizardInput 
                  inputGroupAttributes={inputGroupMap[inputName]} 
                  inputName={inputName}
                  inputValue={inputs[inputName].toLocaleString()}
                  handleInputChange={handleInputChange} 
                  key={inputName}>
                </WizardInput>
              )
            })
          }
        </Row>
        <WizardButtons activeTab={activeTab} handleButtonClick={this.handleButtonClick}></WizardButtons>
      </Row>
    )
  }
}