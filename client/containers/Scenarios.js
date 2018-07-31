import React, { Component, Fragment } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Confirm from '../components/Confirm'
import ScenariosList from '../components/ScenariosList'
import SaveAs from '../components/SaveAs'

export default class Scenarios extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dropdownOpen: false,
      listOpen: false,
      saveOpen: false,
      saveAsOpen: false,
      currentScenario: null,
      savedScenarios: []
    }
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  toggleList = () => {
    this.setState({ listOpen: !this.state.listOpen })
  }

  toggleSave = overwriteId => {
    this.setState({ saveOpen: !this.state.saveOpen, overwriteId })
  }

  toggleSaveAs = () => {
    this.setState({ saveAsOpen: !this.state.saveAsOpen })
  }

  setCurrentScenario = currentScenario => {
    this.setState({ currentScenario })
  }

  updateSavedScenarios = savedScenarios => {
    this.setState({ savedScenarios })
  }

  getScenarios = () => {
    fetch('/scenarios')
      .then(res => res.ok ? res.json() : null)
      .then(savedScenarios => this.setState({ savedScenarios }))
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
      <ButtonDropdown isOpen={this.state.dropdownOpen} className="float-right" toggle={this.toggleDropdown} onClick={this.getScenarios}>
        <DropdownToggle caret outline color="primary">
          Scenarios
        </DropdownToggle>
        <DropdownMenu right={true}>
          <DropdownItem onClick={this.toggleList}>Open</DropdownItem>
            <ScenariosList 
              isOpen={this.state.listOpen} 
              toggleList={this.toggleList} 
              savedScenarios={this.state.savedScenarios}
              handleScenarioOpen={this.props.handleScenarioOpen}
              updateSavedScenarios={this.updateSavedScenarios}>
            </ScenariosList>
          <DropdownItem onClick={this.state.currentScenario ? this.toggleSave : this.toggleSaveAs}>Save</DropdownItem>
            <Confirm 
              isOpen={this.state.saveOpen} 
              currentScenario={this.state.currentScenario}
              toggleSave={this.toggleSave}
              handleOverwrite={this.handleOverwrite}
              inputs={this.props.inputs}>
            </Confirm>
          <DropdownItem onClick={this.toggleSaveAs}>Save As</DropdownItem>
            <SaveAs
              isOpen={this.state.saveAsOpen}
              toggleSaveAs={this.toggleSaveAs}
              inputs={this.props.inputs}
              setCurrentScenario={this.setCurrentScenario}
              savedScenarios={this.state.savedScenarios}
              getScenarios={this.getScenarios}>
            </SaveAs>
        </DropdownMenu>
      </ButtonDropdown>
      </Fragment>
    )
  }
}
