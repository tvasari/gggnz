import React, { Component } from 'react';
import './App.css';
import Cover from './components/Cover.js'
import Social from './components/Social.js'
import Headers from './components/Headers.js'

class App extends Component {
  render() {
    return (
      <div className="App h-100">
        <Cover />
        <Headers />
        <Social />
      </div>
    );
  }

}

export default App;
