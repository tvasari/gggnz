import React, { Component } from 'react';
import './App.css';
import Navbar from '../../components/Navbar/Navbar.js';
import Homepage from '../Homepage/Homepage.js';
import Works from '../Works/Works.js';

const herokuhost = 'https://polar-basin-66660.herokuapp.com';

const N = Math.floor(Math.random() * 22);

class App extends Component {

  constructor() {
    super()
    this.state = {
      route: 'home',
      screenDiff: 0,
      screenSizeIsMaj: true,
      sfondi: [],
      initialWorksPhotos: [],
      worksPhotos: [],
      initialWorksList: [],
      worksList: [],
      initialPhotoList: [],
      photoList: [],
      offSetPage: 0
    }
  }

  updateDimensions = () => {
    window.innerWidth < 1150 ?
    this.setState({screenSizeIsMaj: false}) :
    this.setState({screenSizeIsMaj: true})
  }


  updateThumbs = (list, max_photos, max_rows, max_cols, rowspace, colspace, n1, n2, n3, n4) => {
    const { photoList } = this.state;
    var sumOperator = (a, b) => {
      let sum = a + b;
      return sum;
    }
    var subOperator = (a, b) => {
      let sub = a - b;
      return sub;
    }

    for ( var row = 0; row < max_photos; row++ ) {   
      var divY = document.getElementById(list[row].key)
      var rectY = divY.getBoundingClientRect();
      var topOff = rectY.top;
      var counter = 0
      var yUpdater = (counter, func, list) => {
        this.setState(prevState => {
          let myListY;
          list === photoList ?
            myListY = Object.assign({}, prevState.photoList) :
            myListY = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(myListY[i].r === counter) {
              var a = parseInt(myListY[i].y);
              var b = max_rows * rowspace;
              myListY[i].y = func(a, b)
            }
          }
          return { myListY }; 
        })
      }

      if (row >= max_cols) {
        counter = Math.floor(row / max_cols)
      }
      if (list[row].r === counter && topOff > n1) {
        yUpdater(counter, subOperator, list);
      }
      else if (list[row].r === counter && topOff <  n2) {
        yUpdater(counter, sumOperator, list);
      }
    }

    for ( var col = 0; col < max_photos; col++ ) {
      var divX = document.getElementById(list[col].key)
      var rectX = divX.getBoundingClientRect();
      var leftOff = rectX.left;
      var xUpdater = (col, func, list) => {
        this.setState(prevState => {
          let myListX;
          list === photoList ?
            myListX = Object.assign({}, prevState.photoList) :
            myListX = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(myListX[i].c === col) {
              var a = parseInt(myListX[i].x);
              var b = max_cols * colspace;
              myListX[i].x = func(a, b)
            }
          }
          return { myListX }; 
        })
      }

      if (list[col].c === col && leftOff < n3) {
        xUpdater(col, sumOperator, list);
      }
      else if (list[col].c === col && leftOff > n4) {
        xUpdater(col, subOperator, list);
      }
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

    this.setState({screenDiff: window.screen.availWidth - window.innerWidth});
    window.addEventListener("resize", this.updateDimensions);

    fetch(`${herokuhost}/homecards`)
    .then(response => response.json())
    .then(photos => {
      const photoPush = [];
        photos.forEach((photo, i) => {
          photoPush.push(
            {
              key: photo.column_row,
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


  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }


  render() {
    const { worksPhotos, worksList, sfondi, photoList, route, screenDiff, screenSizeIsMaj } = this.state;
    
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
              screenDiff={screenDiff}
              screenSizeIsMaj={screenSizeIsMaj}
              updateThumbs={this.updateThumbs}
              /> :
              <Works
              initialWorksPhotos={this.state.initialWorksPhotos}
              worksPhotos={worksPhotos}
              worksList={worksList}
              route={route}
              screenDiff={screenDiff}
              screenSizeIsMaj={screenSizeIsMaj}
              updateThumbs={this.updateThumbs}
              />
            }
          </div>   
        </div>
      );
    }
}

export default App;
