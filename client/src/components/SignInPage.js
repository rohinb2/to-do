import React, { Component } from 'react';

class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit = async () => {

        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(this.state)
        }

        const response = await fetch('/api/login/', request);
    }

    // handleSubmit() {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open('POST', 'api/login', true);
    //     xmlHttp.setRequestHeader('Content-Type', 'application/json');
    //     xmlHttp.send(JSON.stringify({
    //         username: 'rohin',
    //         password: '123456789'
    //     }))
    // }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
                    Password:
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SignInPage;