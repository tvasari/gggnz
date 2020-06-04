import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Card from '../Card/Card.js';
import Headers from '../Headers/Headers.js';
import './Homepage.css';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: this.props.photoList,
      route: this.props.route,
      screenSizeIsMaj: true,
      screenDiff: 0
    }
  }

  updateDimensions = () => {
    window.innerWidth < 1150 ?
    this.setState({screenSizeIsMaj: false}) :
    this.setState({screenSizeIsMaj: true})
  }

  componentDidMount() {
    this.setState({screenDiff: window.screen.availWidth - window.innerWidth});
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateThumbs = () => {

    const { photoList } = this.state;

    const max_photos = 32;
    const max_rows = 4;
    const max_cols = 8;
    const rowspace = 600;
    const colspace = 500;

    for ( var row = 0; row < max_photos; row++ ) {

      var divy = document.getElementById(photoList[row].url)
      var recty = divy.getBoundingClientRect();
      var topOff = recty.top;
      var counter = 0
      if (row >= 8) {
        counter = Math.floor(row / 8)
      }
      if (photoList[row].r === counter && topOff < - 700) {
        this.setState(prevState => {
          let photoList = Object.assign({}, prevState.photoList);
          for(var i=0; i < max_photos; i++) {
            if(photoList[i].r === counter) {
              photoList[i].y = parseInt(photoList[i].y) + max_rows * rowspace;
            }
          }
          return photoList;    
        })
      }
      else if (photoList[row].r === counter && topOff > window.innerHeight + 50) {
        this.setState(prevState => {
          let photoList = Object.assign({}, prevState.photoList);
          for(var i=0; i < max_photos; i++) {
            if(photoList[i].r === counter) {
              photoList[i].y = parseInt(photoList[i].y) - max_rows * rowspace;
            }
          }
          return photoList;
        })
      }
    }

    for ( var col = 0; col < max_photos; col++ ) {

      var divx = document.getElementById(photoList[col].url)
      var rectx = divx.getBoundingClientRect();
      var leftOff = rectx.left;
      if (photoList[col].c === col && leftOff < -1000) {
        this.setState(prevState => {
          let photoList = Object.assign({}, prevState.photoList);
          for(var i=0; i < max_photos; i++) {
            if(photoList[i].c === col) {
              photoList[i].x = parseInt(photoList[i].x) + max_cols * colspace;
            }
          }
          return photoList;
        })
      }
      else if (photoList[col].c === col && leftOff > window.innerWidth + 900) {
        this.setState(prevState => {
          let photoList = Object.assign({}, prevState.photoList);
          for(var i=0; i < max_photos; i++) {
            if(photoList[i].c === col) {
              photoList[i].x = parseInt(photoList[i].x) - max_cols * colspace;
            }
          }
          return photoList;
        })
      }
    }
  }

  render() {
    const { photoList, route, screenDiff } = this.state;

    return (
          <Draggable
            onStop={this.updateThumbs}>
            <div 
              className='homeinner inner absolute h-100' 
              id='homeinner'
              style={{left: `${-1400 - (screenDiff / 3.7)}px`, 
              top: '-1285px'}}>
              {
                photoList.map((photo, i) => {
                  if (photo.card_id === 18) {
                    return window.innerWidth > 1150 ?
                      (<div key={'div' + i}> 
                        <Headers
                        key={'Headers' + i} 
                        x={photo.x - 250}
                        y={photo.y + 330}
                        w='50%'/>
                      </div>) :
                      (<div key={'div' + i}> 
                        <Headers
                        key={'Headers' + i} 
                        x={photo.x - 250}
                        y={photo.y + 250}
                        w='50%'/>
                      </div>)
                  } else {
                    return <Card
                      id={photo.url}
                      key={i}
                      photo={photo.url}
                      route={route}
                      c={photo.c}
                      r={photo.r}
                      x={photo.x}
                      y={photo.y}
                      />
                  }
                })
              }   
            </div>
          </Draggable>
        );
  }
}

export default Homepage;