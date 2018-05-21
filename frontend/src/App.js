import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import TodoContainer from './components/TodoContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Todo</h1>
        </header>
        <TodoContainer/>
      </div>
    );
  }
}

export default App;
