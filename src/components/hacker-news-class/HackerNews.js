import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

export default class HackerNewsClass extends Component {
  constructor() {
    console.log('constructor ==> ')
    super()
    this.state = {
      storiesResult: [],
      storyType: '',
      wait: false
    }
  }
  topStories = _ => {
    this.setState({
      storyType: 'topstories'
    })
  }
  askStories = _ => {
    this.setState({
      storyType: 'askstories'
    })
  }
  render() {
    console.log('render ==> ', this.state.wait)
    let html = (this.state.wait) ? <CircularProgress /> : <div></div>
    if (this.state.storiesResult.length) {
      let keys = Object.keys(this.state.storiesResult[0].data)
      const index = keys.indexOf('kids');
      if (index > -1) {
        keys.splice(index, 1);
      }
      const headingItems = _ => {
        return keys.map((item, i) => <th key={i}>{item}</th>)
      }
      const bodyItems = _ => {
        let tdCounter = 0
        return this.state.storiesResult.map((item, i) => {
          let trow = []
          for (let k in item.data) {
            if (keys.indexOf(k) > -1) {
              trow.push(<td key={`${++tdCounter}_${item.data.id}`}>{item.data[k]}</td>)
            }
          }
          return <tr key={i}>{trow}</tr>
        }
        )
      }
      html = <table className="storiesTable"><thead><tr>{headingItems()}</tr></thead><tbody>{bodyItems()}</tbody></table>
    }
    return (
      <div className="counter-section">
        <h3>Hacker News Class Component</h3>
        <div className="story-buttons">
          <Button variant="contained" color="primary" onClick={this.topStories}>
            Show Top Stories
          </Button>
          <Button variant="contained" color="primary" onClick={this.askStories}>
            Show Ask Stories
          </Button>
          <span>
            <RefreshIcon onClick={() => this.setState({ wait: false, storiesResult: [] })}/>
          </span>
        </div>
        <div className="story-contents">
          {html}
        </div>
      </div>
    )
  }
  componentDidMount() {
    console.log('componentDidMount ==> ')
    // this.fetchStories()
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps ==> ', props, state)
    return null
  }
  componentDidUpdate(prevProp, prevState) {
    console.log('componentDidUpdate ==> ', this.state.wait)
    if (this.state.storyType !== prevState.storyType) {
      console.log('this.state.wait ==> ', this.state.wait)
      this.fetchStories()
    }
  }
  fetchStories = _ => {
    this.setState({
      wait: true,
      storiesResult: []
    })
    let askStories = [], __this = this
    axios.get(`https://hacker-news.firebaseio.com/v0/${this.state.storyType}.json?print=pretty`)
      .then(function (response) {
        // handle success
        response.data.slice(0, 50).map((item, i) => askStories.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
        Promise.all(askStories).then(data => {
          console.log('data', data);
          __this.setState({
            storiesResult: data,
            wait: false
          })
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}
