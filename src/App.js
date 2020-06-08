import React, { Component, useLayoutEffect, useState, Fragment } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Homepage from './components/Homepage/Homepage.js';
import Works from './components/Works/Works.js';

const localhost = 'http://localhost:3001';
const herokuhost = 'https://polar-basin-66660.herokuapp.com';

const N = Math.floor(Math.random() * 22);


class App extends Component {

  constructor() {
    super()
    this.state = {
      route: 'home',
      sfondi: [],
      initialWorksPhotos: [],
      worksPhotos: [],
      initialWorksList: [],
      worksList: [],
      initialPhotoList: [],
      photoList: []
    }
  }

  onRouteChange = (route) => {
    const initialWorksListState = JSON.parse(JSON.stringify(this.state.initialWorksList));
    const initialPhotoListState = JSON.parse(JSON.stringify(this.state.initialPhotoList));    

    if (this.state.route !== route) {
      this.setState({route: route});
      this.setState({worksList: initialWorksListState});
      this.setState({photoList: initialPhotoListState});
    }
  }

  componentDidMount() {

    fetch(`${herokuhost}/homecards`)
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
      const initialPhotoPush = JSON.parse(JSON.stringify(photoPush))
      this.setState({initialPhotoList: initialPhotoPush});
      this.setState({photoList: photoPush});
    })
    .catch(err => console.log('Error: ' + err))

    fetch(`${herokuhost}/workscards`)
    .then(response => response.json())
    .then(works => {
      const worksPush = [];
        works.forEach((work, i) => {
          worksPush.push(
            {
              key: work.column_row,
              id: work.url,
              card_id: work.card_id,
              c: work.column_number,
              r: work.row_number,
              x: Math.floor(500 * work.column_number / 2.2),
              y: Math.floor(600 * work.row_number / 2.2)
            },
          );
        })
      const initialWorksPush = JSON.parse(JSON.stringify(worksPush))
      this.setState({initialWorksList: initialWorksPush});
      this.setState({worksList: worksPush});
      this.setState({worksPhotos: works});
      this.setState({initialWorksPhotos: works});
    })
    .catch(err => console.log('Error: ' + err))

    fetch(`${herokuhost}/sfondignz`)
    .then(response => response.json())
    .then(sfondiUrl => {
        const sfondiUrlArray = sfondiUrl.map((sfondo, i) => {
          return Object.values(sfondo)[0];
        })
        this.setState({sfondi: sfondiUrlArray});
    })
    .catch(err => console.log('Error: ' + err))
  };

  render() {
    const { worksPhotos, worksList, sfondi, photoList, route } = this.state;
    
    const elemsToSort = [photoList, worksPhotos, worksList];
    elemsToSort.forEach(elem => {
      elem.sort((a, b) => {
        return a.card_id - b.card_id;
      })
    })

    return !photoList.length || !sfondi.length ?
      <h1>Loading</h1> :
      (
        <div className="App">
          <img src={sfondi[N]} alt='' className='bg' id='bg' />
          <Navbar onRouteChange={this.onRouteChange}/>
          <div id='showcase' className='absolute w-100 h-100 overflow-hidden'>
            { route === 'home' ?
              <Homepage
              photoList={photoList}
              route={route}
              /> :
              <Works
              initialWorksPhotos={this.state.initialWorksPhotos}
              worksPhotos={worksPhotos}
              worksList={worksList}
              route={route}
              />
            }
          </div>   
        </div>
      );
    }
}

export default App;
