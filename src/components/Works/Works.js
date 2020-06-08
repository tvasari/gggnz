import React, { Component, Fragment } from 'react';
import Draggable from 'react-draggable';
import Card from '../Card/Card.js';
import PopUp from '../PopUp/PopUp.js';
import FilterPaintings from '../FilterPaintings/FilterPaintings.js';
import './Work.css'

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
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
      setDragging: false,
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
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateDimensions)
  }

  openPopUp = (photo) => {
    var popup = document.getElementsByClassName('mypopup');
    popup[0].classList.toggle('show');
    popup[1].classList.toggle('show');
    this.setState({card_url: photo})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onStartDrag = (e, position) => {
    const {x, y} = position;
    this.setState({startPosition: {x, y}})
  }

  onButtonSubmit = () => {
    let clone = this.state.initialWorksPhotos.slice(0)

    if (this.state.input === '') {
      return this.setState({worksPhotos: this.state.initialWorksPhotos});
    } else {
      const matches = this.state.initialWorksPhotos.filter(work => {
        if (work.color === null) {
          return null;
        } else {
          return work.color.toLowerCase().includes(this.state.input.toLowerCase());
        }
      })

      let counter = 0;
      const display = clone.map(work => {
        counter++
        if (counter === matches.length) {
          counter = 0;
        }
        if (matches.length > 0) {
          for (var i=0; i < matches.length; i++) {
            if (work !== matches[i]) {
              return matches[counter];
            } else {
              return work;
            }
          }
        } else {
          return clone.find(photo => photo.card_id === 26)
        }
      })
      display.pop();
      display.pop();
      display.splice(25, 0, this.state.worksPhotos.find(photo => photo.card_id === 26))
      display.splice(26, 0, this.state.worksPhotos.find(photo => photo.card_id === 27))

      this.setState({worksPhotos: display})

      document.getElementById("myTextField").blur(); 
    }
  }

  updateThumbs = (e, position) => {

    const {x, y} = position; 
    this.setState({stopPosition: {x, y}})
    if (this.state.startPosition.x !== this.state.stopPosition.x
          ||
        this.state.startPosition.y !== this.state.stopPosition.y) {
      this.setState({setDragging: true})
    } else {
      this.setState({setDragging: false})
    }

    const { worksList } = this.state;

    const max_photos = 44;
    const max_rows = 2;
    const max_cols = 11;
    const rowspace = 550;
    const colspace = 227;

    for ( var row = 0; row < max_photos; row++ ) {

      var divy = document.getElementById(worksList[row].key)
      var recty = divy.getBoundingClientRect();
      var topOff = recty.top;
      var counter = 0
      //console.log(worksList[row].key)
      //console.log('topoff', topOff)
      //console.log('condition is < ', - (window.innerHeight - 20) )

      if (row >= 11) { //adjust loops if you insert the number corresponding to the real number of columns because there will be es. a row 0 for each column you have.
        counter = Math.floor(row / 11)
      }
      if (worksList[row].r === counter && topOff > 600) {
        this.setState(prevState => {
          let worksList = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(worksList[i].r === counter) {
              worksList[i].y = parseInt(worksList[i].y) - max_rows * rowspace;
            }
          }
          return { worksList };    
        })
      }
      else if (worksList[row].r === counter && topOff <  - (window.innerHeight - 20)) {
        this.setState(prevState => {
          let worksList = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(worksList[i].r === counter) {
              worksList[i].y = parseInt(worksList[i].y) + max_rows * rowspace;
            }
          }
          return { worksList };
        })
      }
    }

    for ( var col = 0; col < max_photos; col++ ) {

      var divx = document.getElementById(worksList[col].key)
      var rectx = divx.getBoundingClientRect();
      var leftOff = rectx.left;
      if (worksList[col].c === col && leftOff < -200) {
        this.setState(prevState => {
          let worksList = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(worksList[i].c === col) {
              worksList[i].x = parseInt(worksList[i].x) + max_cols * colspace;
            }
          }
          return { worksList };
        })
      }
      else if (worksList[col].c === col && leftOff > window.innerWidth + 200) {
        this.setState(prevState => {
          let worksList = Object.assign({}, prevState.worksList);
          for(var i=0; i < max_photos; i++) {
            if(worksList[i].c === col) {
              worksList[i].x = parseInt(worksList[i].x) - max_cols * colspace;
            }
          }
          return { worksList };
        })
      }
    }
  }

  getFocus() {
    var worksinner = document.getElementById('worksinner')
    let innerTopOff = worksinner.getBoundingClientRect().top;
    let innerLeftOff = worksinner.getBoundingClientRect().left;
    document.getElementById("myTextField").focus({preventScroll:true});       
    this.setState({worksInnerPos: {
      top: innerTopOff - this.state.stopPosition.y,
      left: innerLeftOff - this.state.stopPosition.x
    }})
  }


  render() {
    const { worksPhotos, worksList, worksInnerPos, setDragging, route, screenDiff } = this.state;

    return (
          <Fragment>
            <PopUp 
            openPopUp={this.openPopUp} 
            photo={this.state.card_url}
            className='popup'/>
            <Draggable
              onStart={this.onStartDrag}
              onStop={this.updateThumbs}
              cancel='popup'>
              <div
                id='worksinner'
                className='worksinner inner absolute h-100'
                style={{top: `${worksInnerPos.top}px`, left: `${worksInnerPos.left - (screenDiff / 2.2)}px`, width: '100vw'}}>
                {
                  worksPhotos.map((work, i) => {
                    if (work.card_id === 27) {
                      return window.innerWidth > 1150 ? 
                        (<Fragment>
                          <FilterPaintings
                          key={'searchField' + i}
                          x={worksList[i].x}
                          y={worksList[i].y}
                          w='30%'
                          route={route}
                          onInputChange={this.onInputChange}
                          onButtonSubmit={this.onButtonSubmit}
                          getFocus={this.getFocus}
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
                        </Fragment>) :
                        (<Fragment>
                          <FilterPaintings
                          key={'searchField' + i}
                          x={worksList[i].x + 60}
                          y={worksList[i].y - 30}
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
                        </Fragment>)
                    } else {
                      return <Card
                        id={worksList[i].key}
                        key={i}
                        photo={work.url}
                        route={route}
                        openPopUp={this.openPopUp}
                        setDragging={setDragging}
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