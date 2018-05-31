import React, { Component } from 'react';

class SignUpPage extends Component {

    // TODO: Finish adding other form elements to this class.

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

    handleSubmit(event) {
        // TODO: Api call
    }

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

export default SignUpPage;