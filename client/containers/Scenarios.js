import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Save from '../components/Save'
import ScenariosList from './ScenariosList'
import SaveAs from '../components/SaveAs'

export default class Scenarios extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dropdownOpen: false,
      listOpen: false,
      saveOpen: false,
      saveAsOpen: false,
      savedScenarios: []
    }
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  toggleList = () => {
    this.setState({ listOpen: !this.state.listOpen })
  }

  toggleSave = SaveId => {
    this.setState({ saveOpen: !this.state.saveOpen, SaveId })
  }

  toggleSaveAs = () => {
    this.setState({ saveAsOpen: !this.state.saveAsOpen })
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
    const { listOpen, savedScenarios, dropdownOpen, saveAsOpen } = this.state
    const { handleScenarioOpen, currentScenario, setCurrentScenario, inputs } = this.props
    return (
      <ButtonDropdown isOpen={dropdownOpen} className="float-right" toggle={this.toggleDropdown} onClick={this.getScenarios}>
        <DropdownToggle caret color="link">
          Scenarios
        </DropdownToggle>
        <DropdownMenu right={true}>
          <DropdownItem onClick={this.toggleList}>Open</DropdownItem>
            <ScenariosList 
              isOpen={listOpen} 
              toggleList={this.toggleList} 
              savedScenarios={savedScenarios}
              currentScenario={currentScenario}
              handleScenarioOpen={handleScenarioOpen}
              updateSavedScenarios={this.updateSavedScenarios}
              setCurrentScenario={setCurrentScenario}>
            </ScenariosList>
          <DropdownItem onClick={currentScenario.name ? this.toggleSave : this.toggleSaveAs}>Save</DropdownItem>
            <Save 
              isOpen={this.state.saveOpen} 
              inputs={inputs}
              currentScenario={currentScenario}
              toggleSave={this.toggleSave}>
            </Save>
          <DropdownItem onClick={this.toggleSaveAs}>Save As</DropdownItem>
            <SaveAs
              isOpen={saveAsOpen}
              inputs={inputs}
              setCurrentScenario={setCurrentScenario}
              savedScenarios={savedScenarios}
              toggleSaveAs={this.toggleSaveAs}
              getScenarios={this.getScenarios}>
            </SaveAs>
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}
