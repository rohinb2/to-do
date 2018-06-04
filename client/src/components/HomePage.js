import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TodoContainer from './TodoContainer';

class HomePage extends Component {

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

        // Check if promise was resolved
        if (this.state.loggedIn == null) {
            return null;
        }
        // If not logged in, redirect to login page.
        console.log(this.state.loggedIn ? <TodoContainer /> : <Redirect to='/login' push />);
        return (
            this.state.loggedIn ? <TodoContainer /> : <Redirect to='/login' push />
        );
    }

}

export default HomePage;