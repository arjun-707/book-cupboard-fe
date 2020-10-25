import React from 'react';
import './App.scss';
import Count from './components/counter/Count';
import HackerNews from './components/hacker-news/HackerNews';

function App() {
  return (
    <div className="App">
      <Count />
      <HackerNews />
    </div>
  );
}

export default App;
