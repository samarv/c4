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

  assertsRowWin = () => {
    this.onColumnClick(1, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(3, 1);
    this.onColumnClick(4, 1);
    assert(this.checkRowWin() === true);
  };

  assertColWin = () => {
    this.onColumnClick(2, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(2, 1);
    assert(this.checkColWin() === true);
  };

  assertDiagnolWin = () => {
    this.onColumnClick(0, 1);
    this.onColumnClick(0, 2);
    this.onColumnClick(1, 1);
    this.onColumnClick(1, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(2, 1);
    this.onColumnClick(3, 2);
    this.onColumnClick(3, 1);
    this.onColumnClick(3, 1);
    this.onColumnClick(3, 1);
    assert(this.checkDiagnolWin() === true);
  };

  componentDidMount() {
    this.assertsRowWin();
    this.assertColWin();
    this.assertDiagnolWin();
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

  checkColWin = () => {
    let transMatrix = this.transposeMatrix([...this.state.matrix]);
    for (let row = 0; row < transMatrix.length; row++) {
      if (this.check4(transMatrix[row]) === true) {
        return true;
      }
    }
    return false;
  };

  checkDiagnolWin = () => {
    let { matrix } = this.state;
    let diaArr = this.getDiagonals(matrix);
    for (let i = 0; i < diaArr.length; i++) {
      if (this.check4(diaArr[i]) === true) {
        return true;
      }
    }
    return false;
  };

  getDiagonals = matrix => {
    let output = new Array(2 * matrix.length - 1);
    for (let i = 0; i < output.length; ++i) {
      output[i] = [];
      if (i < matrix.length)
        for (let j = 0; j <= i; ++j) {
          output[i].push(matrix[i - j][j]);
        }
      else
        for (let j = matrix.length - 1; j > i - matrix.length; --j) {
          output[i].push(matrix[j][i - j]);
        }
    }
    return output;
  };

  transposeMatrix = arr => {
    return arr[0].map((col, i) => arr.map(row => row[i]));
  };

  render() {
    let { matrix } = this.state;
    return (
      <div className="App">
        <table>
          <tbody>
            {matrix.map((row, i) => {
              return (
                <tr key={i}>
                  {matrix[i].map((col, j) => {
                    if (matrix[i][j] === 0) {
                      return <td key={j}>{matrix[i][j]}</td>;
                    } else if (matrix[i][j] === 1) {
                      return (
                        <td className="yellowDisc" key={j}>
                          {matrix[i][j]}
                        </td>
                      );
                    } else if (matrix[i][j] === 2) {
                      return (
                        <td className="redDisc" key={j}>
                          {matrix[i][j]}
                        </td>
                      );
                    } else {
                      return <td key={j}>{matrix[i][j]}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
