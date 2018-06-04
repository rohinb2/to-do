import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './static/css/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Your To Do App'
    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
