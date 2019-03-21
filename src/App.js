import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  gridSize = "3x3";
  score = 0;
  highest = localStorage.getItem("highest") || 0;
  size = 3;
  sizeMap = [1, 2, 3];
  intervalCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      size: 3,
      sizeMap: [1, 2, 3],
      intervalCount: 0
    }
  }

  setGridSize = (size) => {
    this.size = size;
    switch (size) {
      case 3: this.gridSize = "Easy:3x3"; break;
      case 4: this.gridSize = "Medium:4x4"; break;
      case 6: this.gridSize = "Hard:6x6"; break;
    }
    let sizeMap = [];
    for (let i = 0; i < size; i++) {
      sizeMap.push(i);
    }
    this.sizeMap = sizeMap;
    this.setState({ size: size, sizeMap, score: 0 });
  };

  onCellClick = function (event) {
    let score = this.state.score;
    if (event.target.classList.contains('selected')) {
      score++;
    }
    else {
      score--;
    }
    if (score > this.highest) {
      this.highest = score;
      // Store highest score in localstorage
      localStorage.setItem("highest", this.highest);
    }
    this.setState({ score: score });
  };


  componentDidMount() {
    let intervalCount = this.intervalCount;
    let resetGame = this.resetGame;
    let column = this.state.sizeMap.length;
    setInterval(function () {
      let size = 3;
      if (intervalCount++ > 120) {
        intervalCount = 0;
        resetGame();
        alert("Game Over !!!");
      }
      var matches = document.getElementsByClassName("grid-column");
      var selectedCellIndex = Math.floor(Math.random() * (matches.length));
      for (var i = 0; i < matches.length; i++) {
        matches[i].classList && matches[i].classList.remove('selected');
      }
      document.getElementsByClassName("grid-column")[selectedCellIndex].classList.add("selected");
    }, 1000);
  }


  restartGame = function () {
    this.resetGame();
  };

  resetGame = () => {
    this.intervalCount = 0;
    this.score = 0;
    this.setState({ score: 0 });
  }


  render() {
    return (
      <div className="App">
        <body class="grid-container">
          <h1>Board Game: {this.gridSize}</h1>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" onClick={() => this.setGridSize(3)}>3x3</button>
            <button type="button" class="btn btn-default" onClick={() => this.setGridSize(4)}>4x4</button>
            <button type="button" class="btn btn-default" onClick={() => this.setGridSize(6)}>6x6</button>
            <button type="button" class="btn btn-success" onClick={() => this.restartGame()}>Restart</button>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Score: {this.state.score}</h3>
              <h3>Highest: {this.highest}</h3>
            </div>
            <div class="panel-body">
              {this.state.sizeMap.map(e => {
                return (
                  <div class="grid-row" >
                    {this.state.sizeMap.map(e => {
                      return (
                        <div class="grid-column" onClick={(event) => this.onCellClick(event)}></div>
                      )
                    })
                    }
                  </div>
                )
              }
              )
              }
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
