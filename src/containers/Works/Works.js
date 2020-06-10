import React, { Component, Fragment } from 'react';
import Draggable from 'react-draggable';
import Card from '../../components/Card/Card.js';
import PopUp from '../../components/PopUp/PopUp.js';
import FilterPaintings from '../../components/FilterPaintings/FilterPaintings.js';
import './Work.css'

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      route: this.props.route,
      initialWorksPhotos: this.props.initialWorksPhotos,
      worksPhotos: this.props.worksPhotos,
      worksList: this.props.worksList,
      card_url: '',
      startPosition: {
        x: 0, y: 0
      },
      stopPosition: {
        x: 0, y: 0
      },
      worksInnerPos: {
        top: -395, left: -255
      },
      isDragging: false,
      screenSizeIsMaj: this.props.screenSizeIsMaj,
      screenDiff: this.props.screenDiff,
      isFocused: false
    }
  }

  openPopUp = (photo) => {
    var popup = document.getElementsByClassName('mypopup');
    popup[0].classList.toggle('show');
    popup[1].classList.toggle('show');
    this.setState({card_url: photo})
  }

  onInputChange = (event) => {
    this.setState({userInput: event.target.value});
  }

  onButtonSubmit = () => {
    const { initialWorksPhotos, userInput, worksPhotos } = this.state;

    let clone = initialWorksPhotos.slice(0)

    if (userInput === '') {
      return this.setState({worksPhotos: initialWorksPhotos});
    } else {

      let matches = initialWorksPhotos.filter(work => {
        return work.color === null ? null : work.color.toLowerCase().includes(userInput.toLowerCase())
      })
      matches = matches.filter(match => {
        return match.card_id !== 26 && match.card_id !== 27
      })

      let counter = 0;
        const display = clone.map(work => {
        counter++
        if (counter === matches.length) {
          counter = 0;
        }
        if (matches.length > 0) {
          for (var i=0; i < matches.length; i++) {
            return work !== matches[i] ? matches[counter] : work;
          }
        } else {
          return clone.find(photo => photo.card_id === 26)
        }
      })

      display.pop();
      display.pop();
      display.splice(25, 0, worksPhotos.find(photo => photo.card_id === 26))
      display.splice(26, 0, worksPhotos.find(photo => photo.card_id === 27))
      this.setState({worksPhotos: display})

      document.getElementById("myTextField").blur(); 
    }
  }

  onStartDrag = (e, position) => {
    const {x, y} = position;
    this.setState({startPosition: {x, y}})
  }

  setDragging = (e, position) => {
    const { startPosition  } = this.state;

    const {x, y} = position; 
    this.setState({stopPosition: {x, y}})
    if (startPosition.x !== this.state.stopPosition.x
          ||
        startPosition.y !== this.state.stopPosition.y) {
      this.setState({isDragging: true})
    } else {
      this.setState({isDragging: false})
    }
  }

  getFocus() {
    document.getElementById("myTextField").focus({preventScroll:true});
    this.setState({isFocused: true});       
  }

  callItOnDragStop = (e, position) => {
    this.setDragging(e, position);
    this.props.updateThumbs(this.state.worksList, 44, 2, 11, 550, 227, 600, -(window.innerHeight - 20), -200, window.innerWidth + 200);
  }

  render() {
    const { worksPhotos, worksList, worksInnerPos, isDragging, route, screenDiff } = this.state;

    return (
          <Fragment>
            <PopUp 
            openPopUp={this.openPopUp} 
            photo={this.state.card_url}
            className='popup'/>
            <Draggable
              onStart={this.onStartDrag}
              onStop={this.callItOnDragStop}
              cancel='popup'>
              <div
                id='worksinner'
                className='worksinner inner absolute h-100'
                style={{top: `${worksInnerPos.top}px`, left: `${worksInnerPos.left - (screenDiff / 2.2)}px`, width: '100vw'}}>
                {
                  worksPhotos.map((work, i) => {
                    if (work.card_id === 27) {
                      return <Fragment key={'Fragment' + i}>
                        <FilterPaintings
                        key={'searchField' + i}
                        x={window.innerWidth > 1150 ? worksList[i].x : worksList[i].x + 60}
                        y={window.innerWidth > 1150 ? worksList[i].y : worksList[i].y - 30}
                        w='30%'
                        route={route}
                        onInputChange={this.onInputChange}
                        onButtonSubmit={this.onButtonSubmit}
                        getFocus={this.getFocus.bind(this)}
                        />
                        <Card
                        id={worksList[i].key}
                        key={i}
                        photo={work.url}
                        route={route}
                        c={work.column_number}
                        r={work.row_number}
                        x={worksList[i].x}
                        y={worksList[i].y}
                        />
                      </Fragment>
                    } else {
                      return <Card
                        id={worksList[i].key}
                        key={i}
                        photo={work.url}
                        route={route}
                        openPopUp={this.openPopUp}
                        isDragging={isDragging}
                        c={work.column_number}
                        r={work.row_number}
                        x={worksList[i].x}
                        y={worksList[i].y}
                        />
                    }
                  })
                }   
              </div>
            </Draggable>
          </Fragment>
        );
  }
}

export default Works;