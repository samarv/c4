import React, { Component } from "react";
import "./App.css";
var assert = require("assert");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: Array(6)
        .fill(0) //1. 6 rows
        .map(row => new Array(7).fill(0)), // 7 colums
      currentPlayer: 1,
    };
  }

  resetMatrix = () => {
    this.setState({
      matrix: Array(6)
        .fill(0) //1. 6 rows
        .map(row => new Array(7).fill(0)),
    });
  };

  assertsRowWin = () => {
    this.onColumnClick(1, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(3, 1);
    this.onColumnClick(4, 1);
    assert(this.checkRowWin() === true);
    this.resetMatrix();
    this.onColumnClick(1, 1);
    this.onColumnClick(1, 1);
    this.onColumnClick(3, 1);
    this.onColumnClick(4, 1);
    assert(this.checkRowWin() === false);
  };

  componentDidMount() {
    this.assertsRowWin();
    this.onColumnClick(1, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(3, 1);
    this.onColumnClick(4, 1);
    console.log(this.checkRowWin());
  }
  componentDidUpdate() {
    // console.log("boo");
    console.log(this.state.matrix);
  }

  onColumnClick = (selectedColNum, currentPlayer) => {
    let newArr = [...this.state.matrix];
    let lowestIndex = 0;
    // change 0 to 1 in lowest row available
    for (let row = 0; row < newArr.length; row++) {
      for (let col = 0; col < newArr[row].length; col++) {
        if (col === selectedColNum && newArr[row][selectedColNum] <= 0) {
          lowestIndex = row;
        }
      }
    }
    newArr[lowestIndex][selectedColNum] = currentPlayer;
    this.setState({ matrix: newArr });
  };

  check4 = arr => {
    for (let i = 0; i < arr.length - 3; i++) {
      if (
        arr[i] !== 0 &&
        arr[i] === arr[i + 1] &&
        arr[i + 1] === arr[i + 2] &&
        arr[i + 2] === arr[i + 3]
      ) {
        return true;
      }
    }
    return false;
  };

  checkRowWin = () => {
    let { matrix } = this.state;
    for (let row = 0; row < matrix.length; row++) {
      if (this.check4(matrix[row]) === true) {
        return true;
      }
    }
    return false;
  };
  render() {
    return (
      <div className="App">
        <div>boo</div>
      </div>
    );
  }
}
