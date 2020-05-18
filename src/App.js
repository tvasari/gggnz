import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import CardList from './components/CardList/CardList.js';

const N = Math.floor(Math.random() * 22);

class App extends Component {

  constructor() {
    super()
    this.state = {
      sfondi: [],
      photos: [],
      photoList: [],
      controlledPosition: {
        x: 0, y: 0
      }
    }
  }

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  componentDidMount() {

    fetch('http://localhost:3001/homecards')
    .then(response => response.json())
    .then(photos => {
      const photoPush = [];
        photos.forEach((photo, i) => {
          photoPush.push(
            {
              key: i,
              id: photo.url,
              card_id: photo.card_id,
              url: photo.url,
              c: photo.column_number,
              r: photo.row_number,
              x: 500 * photo.column_number,
              y: 600 * photo.row_number
            },
          );
        })
      this.setState({photoList: photoPush});
      this.setState({photos: photos});
    }) 

    fetch('http://localhost:3001/sfondignz')
    .then(response => response.json())
    .then(sfondiUrl => {
        const sfondiUrlArray = sfondiUrl.map((sfondo, i) => {
          return Object.values(sfondo)[0];
        })
        this.setState({sfondi: sfondiUrlArray});
    })
  };

  render() {
    const { controlledPosition, photos, sfondi, photoList } = this.state;
    photos.sort((a, b) => {
      return a.card_id - b.card_id;
    })
    photoList.sort((a, b) => {
      return a.card_id - b.card_id;
    })


    return !photos.length || !sfondi.length ?
      <h1>Loading</h1> :
      (
        <div className="App">
          <img src={sfondi[N]} alt='' className='bg' />
          <Navbar />
          <div id='showcase' className='absolute left-0 top-0 w-100 h-100 overflow-hidden'>
            <CardList
            photos={photos}
            photoList={photoList}
            controlledPosition={controlledPosition} 
            onControlledDrag={this.onControlledDrag}
            />
          </div>
          
        </div>
      );
    }
}

export default App;
