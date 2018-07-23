import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/Header'
import Wizard from './components/Wizard'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container className="bg-white">
        <Header></Header>
        <Wizard></Wizard>
      </Container>
    )
  }
}