import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import CardList from './components/CardList.js';
import Headers from './components/Headers.js';
import background from './backgrounds-gnz/africa1.jpg'


class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      controlledPosition: {
        x: -10, y: -4
      }
    }
  }

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  componentDidMount() {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(photos => {
      this.setState({photos: photos});
    })
  };

  render() {
    const { controlledPosition, photos } = this.state;

    return !photos.length ?
      <h1>Loading</h1> :
      (
        <div className="App h-100">
          <img src={background} alt='' className='bg' />
          <Navbar />
          <CardList
            controlledPosition={controlledPosition} 
            onControlledDrag={this.onControlledDrag}
            photos={photos}/>
           {/*<Headers 
             controlledPosition={controlledPosition} 
             onControlledDrag={this.onControlledDrag}/> */}
        </div>
      );
    }
}

export default App;
