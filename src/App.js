import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: Array(6)
        .fill(0) //1. 6 rows
        .map(row => new Array(7).fill(0)), // 7 colums
    };
  }

  componentDidMount() {
    console.log("boo");
    console.log(this.state.matrix);
  }

  render() {
    return (
      <div className="App">
        <div>boo</div>
      </div>
    );
  }
}
