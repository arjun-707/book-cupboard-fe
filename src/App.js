import React from 'react';
import './App.scss';
import Count from './components/counter/Count';
import HackerNewsClass from './components/hacker-news-class/HackerNews';
import HackerNewsFunction from './components/hacker-news-function/HackerNews';

function App() {
  return (
    <div className="App">
      <Count />
      <hr />
      <HackerNewsClass />
      <hr />
      <HackerNewsFunction />
    </div>
  );
}

export default App;
