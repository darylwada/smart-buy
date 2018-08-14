import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Save from '../components/Save'
import ScenariosList from './ScenariosList'
import SaveAs from './SaveAs'

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

  toggleSave = () => {
    this.setState({ saveOpen: !this.state.saveOpen })
  }

  toggleSaveAs = () => {
    this.setState({ saveAsOpen: !this.state.saveAsOpen })
  }

  updateSavedScenarios = savedScenarios => {
    this.setState({ savedScenarios })
  }

  getScenarios = () => {
    fetch(`/scenarios/${this.props.user}`)
      .then(res => res.ok ? res.json() : null)
      .then(savedScenarios => this.setState({ savedScenarios }))
  }

  render() {
    const { listOpen, savedScenarios, dropdownOpen, saveOpen, saveAsOpen } = this.state
    const { handleScenarioOpen, currentScenario, clearScenarioName, inputs } = this.props
    const { toggleList, toggleDropdown, updateSavedScenarios, toggleSave, toggleSaveAs, getScenarios } = this
    return (
      <ButtonDropdown isOpen={dropdownOpen} className="float-right" toggle={toggleDropdown} onClick={getScenarios}>
        <DropdownToggle caret color="link">
          Scenarios
        </DropdownToggle>
        <DropdownMenu right={true}>
          <DropdownItem onClick={toggleList}>Open</DropdownItem>
            <ScenariosList 
              isOpen={listOpen} 
              toggleList={toggleList} 
              savedScenarios={savedScenarios}
              currentScenario={currentScenario}
              handleScenarioOpen={handleScenarioOpen}
              updateSavedScenarios={updateSavedScenarios}
              clearScenarioName={clearScenarioName}>
            </ScenariosList>
          <DropdownItem onClick={currentScenario.name ? toggleSave : toggleSaveAs}>Save</DropdownItem>
            <Save 
              isOpen={saveOpen} 
              toggleSave={toggleSave}
              inputs={inputs}
              currentScenario={currentScenario}>
            </Save>
          <DropdownItem onClick={toggleSaveAs}>Save As</DropdownItem>
            <SaveAs
              isOpen={saveAsOpen}
              toggleSaveAs={toggleSaveAs}
              inputs={inputs}
              savedScenarios={savedScenarios}
              handleScenarioOpen={handleScenarioOpen}
              getScenarios={getScenarios}>
            </SaveAs>
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}
