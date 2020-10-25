import React, { Component } from 'react'
import ChildCount from './ChildCount'

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
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
        </div>
        <div className="count">
          {this.state.count}
        </div>
        <ChildCount increment={this.increment} decrement={this.decrement} />
      </div>
    )
  }
}
