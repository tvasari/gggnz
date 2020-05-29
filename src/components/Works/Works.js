import React, { Component, Fragment } from 'react';
import Draggable from 'react-draggable';
import Card from '../Card/Card.js';
import PopUp from '../PopUp/PopUp.js';
import FilterPaintings from '../FilterPaintings/FilterPaintings.js';


class Works extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
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
      setDragging: false
    }
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
    const newWorksPhotosList = this.state.initialWorksPhotos.filter(work => {
      return work.color.toLowerCase()
                       .includes(this.state.input.toLowerCase());
    })

    let counter = 0;

    const displayWorksList = this.state.worksPhotos.map(work => {
      counter++
      if (counter === newWorksPhotosList.length) {
        counter = 0;
      }

      if (newWorksPhotosList.length > 0) {
        for (var i=0; i < newWorksPhotosList.length; i++) {
          if (work !== newWorksPhotosList[i] && newWorksPhotosList.length !== 0) {
            return newWorksPhotosList[counter];
          } else if (newWorksPhotosList[i] === undefined) {
            return this.state.worksPhotos.find(photo => photo.card_id === 27);
          } else {
            return work;
          }
        }
      } else {
        return this.state.worksPhotos.find(photo => photo.card_id === 26)
      }
    })

    displayWorksList.pop()
    displayWorksList.pop()
    displayWorksList.splice(25, 0, this.state.worksPhotos.find(photo => photo.card_id === 26))
    displayWorksList.splice(26, 0, this.state.worksPhotos.find(photo => photo.card_id === 27))    
    this.setState({worksPhotos: displayWorksList})
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

  render() {
    const { worksPhotos, worksList, setDragging, route } = this.state;

    return (
          <Fragment>
            <PopUp 
              card_id={this.state.card_id} 
              openPopUp={this.openPopUp} 
              photo={this.state.card_url}
              setDragging={setDragging}/>
            <Draggable
              onStart={this.onStartDrag}
              onStop={this.updateThumbs} >
              <div
                className='inner absolute w-100 h-100' 
                style={{top: '-400px', left: '-250px'}}>
                {
                  worksPhotos.map((work, i) => {
                    if (work.card_id === 27) {
                      return <div key={'div' + i}> 
                          <FilterPaintings
                          key={'searchField' + i}
                          x={worksList[i].x}
                          y={worksList[i].y}
                          w='30%'
                          onInputChange={this.onInputChange}
                          onButtonSubmit={this.onButtonSubmit}
                          />
                          <Card
                          id={worksList[i].key}
                          key={i}
                          photo={work.url}
                          c={work.column_number}
                          r={work.row_number}
                          x={worksList[i].x}
                          y={worksList[i].y}
                          w='20%'/>
                        </div>
                    } else {
                      return <Card
                        id={worksList[i].key}
                        key={i}
                        photo={work.url}
                        openPopUp={this.openPopUp}
                        setDragging={setDragging}
                        c={work.column_number}
                        r={work.row_number}
                        x={worksList[i].x}
                        y={worksList[i].y}
                        w='20%'/>
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