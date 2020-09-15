import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Card from '../../components/Card/Card.js';
import Headers from '../../components/Headers/Headers.js';
import './Homepage.css';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: this.props.photoList,
      route: this.props.route,
      screenSizeIsMaj: this.props.screenSizeIsMaj,
      screenDiff: this.props.screenDiff
    }
  }

  render() {
    const { photoList, route, screenDiff } = this.state;
    console.log('photoList', photoList)

    return (
          <Draggable
            onStop={() => this.props.updateThumbs(photoList, 32, 4, 8, 600, 500, window.innerHeight + 50, -700, -1000, window.innerWidth + 900)}>
            <div 
              className='homeinner inner absolute h-100' 
              id='homeinner'
              style={{left: `${-1400 - (screenDiff / 3.7)}px`, 
              top: '-1285px'}}>
              {
                photoList.map((photo, i) => {
                  if (photo.card_id === 18) {
                    return <div key={'div' + i}> 
                      <Headers
                      key={'Headers' + i} 
                      x={photo.x - 250}
                      y={window.innerWidth > 1150 ? photo.y + 330 : photo.y + 250}
                      w='50%'/>
                      <Card
                      id={photo.key}
                      key={i}
                      photo={photo.url}
                      route={route}
                      c={photo.c}
                      r={photo.r}
                      x={photo.x}
                      y={photo.y}
                      />
                    </div>
                  } else {
                    return <Card
                      id={photo.key}
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