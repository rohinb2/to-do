"use strict";
import React, { Component } from 'react';

/*
A component for logging in with the inputted username and password.
*/
class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.loginRequest = this.loginRequest.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    loginRequest = async (e) => {
        e.preventDefault();
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }

        const response = await fetch('/api/login/', request);
    }

    render() {
        return (
            <form onSubmit={this.loginRequest}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.onUsernameChange} /><br/>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} /><br/>
                </label>
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default SignInPage;