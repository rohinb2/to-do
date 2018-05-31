import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TodoContainer from './components/TodoContainer'
import SignInPage from './components/SignInPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: 'Your To Do App'
    }

  }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;

  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.response}</h1>
        </header>
        <MuiThemeProvider>
          <SignInPage />
          <TodoContainer/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
