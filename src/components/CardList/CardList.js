import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Card from '../Card/Card.js';
import Headers from '../Headers/Headers.js'


class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: this.props.photos,
      photoList: this.props.photoList,
    }
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
          return { photoList };    
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
          return { photoList };
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
          return { photoList };
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
          return { photoList };
        })
      }
    }
  }

  render() {
    const { photos, photoList } = this.state;
    return (
          <Draggable 
            controlledPosition={this.props.controlledPosition} 
            onDrag={this.props.onControlledDrag}
            onStop={this.updateThumbs} >
            <div className='inner absolute w-100 h-100' style={{top: '-1170px', left: '140px'}}>
              {
                photos.map((photo, i) => {
                  if (i === 17) {
                    return <div> 
                        <Headers 
                        x={photoList[i].x}
                        y={photoList[i].y}/>
                        <Card
                        id={photo.url}
                        key={i}
                        photo={photo.url}
                        c={photo.column_number}
                        r={photo.row_number}
                        x={photoList[i].x}
                        y={photoList[i].y}
                        w='37%'/>
                      </div>
                  } else {
                    return <Card
                      id={photo.url}
                      key={i}
                      photo={photo.url}
                      c={photo.column_number}
                      r={photo.row_number}
                      x={photoList[i].x}
                      y={photoList[i].y}
                      w='37%'/>
                  }
                })
              }   
            </div>
          </Draggable>
        );
  }
}

export default CardList;