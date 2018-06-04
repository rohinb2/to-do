import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

        this.props.isLoggedIn.then((bool) => {
            this.setState({
                loggedIn: bool
            })
        })
    }

    render() {

        // Check if the promise has been resolved yet
        if (this.state.loggedIn == null) {
            return null;
        }

        // Redirect if already logged in
        return (
            this.state.loggedIn ? <Redirect to='/' push /> : <Login />
        );
    }

}

export default LoginPage;