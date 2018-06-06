import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/*
A component for Registering a user with the inputted details.
*/
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            verifyPassword: '',
            email: '',
            first: '',
            last: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onVerifyPasswordChange = this.onVerifyPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFirstChange = this.onFirstChange.bind(this);
        this.onLastChange = this.onLastChange.bind(this);
        this.registerRequest = this.registerRequest.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    
    onVerifyPasswordChange(event) {
        this.setState({ verifyPassword : event.target.value });
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

    registerRequest = async (e) => {
        e.preventDefault();

        // Check if any of the fields are ekpty
        for (var key in this.state) {
            if (this.state.hasOwnProperty(key) && this.state[key] == '') {
                toast.error('The \'' + key + '\' field is empty.', { position: toast.POSITION.TOP_CENTER });
                return;
            }
        }

        // Check if the password is too short
        if (this.state.password.length < 8) {
            toast.error('Please input a password of at least 8 characters', { position: toast.POSITION.TOP_CENTER });
            return;
        }

        // Check if the verify password is the same as the current password
        if (this.state.password !== this.state.verifyPassword) {
            toast.error('Your passwords do not match.', { position: toast.POSITION.TOP_CENTER });
            return;
        }

        // Check if email is actually an email
        if (!this.validateEmail(this.state.email)) {
            toast.error('Please enter a valid email.', { position: toast.POSITION.TOP_CENTER });
            return;
        }

        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }

        fetch('/api/register/', request).then((response) => {
            if (response.status == 302) {
                setTimeout(() => {
                    window.location = '/login';
                }, 100);
            } else if (response.status == 404) {
                toast.error('There is already a user registered with this username.', { position: toast.POSITION.TOP_CENTER });
            }
        });
    }

    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.registerRequest}>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.onUsernameChange} /><br />
                        Password:
                        <input type="password" value={this.state.password} onChange={this.onPasswordChange} /><br />
                        Retype Password:
                        <input type="password" value={this.state.verifyPassword} onChange={this.onVerifyPasswordChange} /><br />
                        Email:
                        <input type="text" value={this.state.email} onChange={this.onEmailChange} /><br />
                        First Name:
                        <input type="text" value={this.state.first} onChange={this.onFirstChange} /><br />
                        Last Name:
                        <input type="text" value={this.state.last} onChange={this.onLastChange} /><br />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default Register;