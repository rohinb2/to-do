import React, { Component } from 'react';

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            first: '',
            last: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFirstChange = this.onFirstChange.bind(this);
        this.onLastChange = this.onLastChange.bind(this);
        this.signupRequest = this.signupRequest.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onFirstChange(event) {
        this.setState({ first: event.target.value });
    }

    onLastChange(event) {
        this.setState({ last: event.target.value });
    }

    signupRequest = async (e) => {
        e.preventDefault();
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }

        const response = await fetch('/api/register/', request);
    }

    render() {
        return (
            <form onSubmit={this.signupRequest}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.onUsernameChange} /><br />
                    Password:
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} /><br />
                    Email:
                    <input type="text" value={this.state.email} onChange={this.onEmailChange} /><br />
                    First Name:
                    <input type="text" value={this.state.first} onChange={this.onFirstChange} /><br />
                    Last Name:
                    <input type="text" value={this.state.last} onChange={this.onLastChange} /><br />
                </label>
                <input type="submit" value="Sign Up" />
            </form>
        );
    }
}

export default SignUpPage;