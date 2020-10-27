import React, { Component } from 'react'
import ChildCount from './ChildCount'
import Button from '@material-ui/core/Button';

export default class Count extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  decrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return (
      <div className="counter-section">
        <div className="parent-counter">
          <label>Parent</label>
          <Button variant="contained" color="primary" onClick={this.increment}>
            Increment
          </Button>
          <Button variant="contained" color="primary" onClick={this.decrement}>
            Decrement
          </Button>
        </div>
        <div className="count">
          {this.state.count}
        </div>
        <ChildCount increment={this.increment} decrement={this.decrement} />
      </div>
    )
  }
}
