import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

function HackerNewsFunction() {
  const [storiesResult, setStoriesResult] = useState([])
  const [storyType, setStoryType] = useState('')
  const [wait, setWait] = useState(false)
  const [html, setHtml] = useState(<div></div>)

  useEffect(() => {
    const fetchStories = _ => {
      setStoriesResult([])
      setWait(true)
      let askStories = []
      axios.get(`https://hacker-news.firebaseio.com/v0/${storyType}.json?print=pretty`)
        .then(function (response) {
          // handle success
          response.data.slice(0, 50).map((item, i) => askStories.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)))
          Promise.all(askStories).then(data => {
            setStoriesResult(data)
            setWait(false)
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setWait(false)
        })
    }
    if (storyType) fetchStories()
  }, [storyType])

  useEffect(() => {
    setHtml((wait) ? <CircularProgress /> : <div></div>)
    if (storiesResult.length) {
      let keys = Object.keys(storiesResult[0].data)
      const index = keys.indexOf('kids');
      if (index > -1) {
        keys.splice(index, 1);
      }
      const headingItems = _ => {
        return keys.map((item, i) => <th key={i}>{item}</th>)
      }
      const bodyItems = _ => {
        let tdCounter = 0
        return storiesResult.map((item, i) => {
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
      setHtml(<table className="storiesTable"><thead><tr>{headingItems()}</tr></thead><tbody>{bodyItems()}</tbody></table>)
    }
  }, [wait, storiesResult])

  console.log('render ==> ', wait)
  return (
    <div className="counter-section">
      <h3>Hacker News Functional Component</h3>
      <div className="story-buttons">
        <Button variant="contained" color="primary" onClick={() => setStoryType('topstories')}>Show Top Stories</Button>
        <Button variant="contained" color="primary" onClick={() => setStoryType('askstories')}>Show Ask Stories</Button>
        <RefreshIcon onClick={() => { setWait(false); setStoriesResult([]);}}/>
      </div>
      <div className="story-contents">
        {html}
      </div>
    </div>
  )
}

export default HackerNewsFunction
