import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import CardList from './components/CardList.js';
import Headers from './components/Headers.js';
import background from './backgrounds-gnz/africa1.jpg'


class App extends Component {

  state = {
    controlledPosition: {
      x: -10, y: -4
    }
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  render() {
    const {controlledPosition} = this.state;

    return (
      <div className="App h-100">
        <img src={background} alt='' className='bg' />
        <Navbar />
        <CardList
          controlledPosition={controlledPosition} 
          onControlledDrag={this.onControlledDrag}/>
        <Headers 
          controlledPosition={controlledPosition} 
          onControlledDrag={this.onControlledDrag}/>
        <CardList
          controlledPosition={controlledPosition} 
          onControlledDrag={this.onControlledDrag}/>
      </div>
    );
  }
}

export default App;
