import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage'; 
import HomePage from './components/HomePage';
import Register from './components/Register';

// Front end routes for the whole app
const Routes = (props) => {
    return (
        <Router {...props}>
            <Switch>
                <Route exact path='/' render={Home} />
                <Route path='/login' render={Login} />
                <Route path='/register' component={Register} />
            </Switch>
        </Router>
    );
}

const Home = (props) => {
    return (
        <HomePage isLoggedIn={isLoggedIn()} />
    );
}

const Login = (props) => {
    return (
        <LoginPage isLoggedIn={isLoggedIn()} />
    );
}

// Helper method that calls the API to check if the current user is logged in
const isLoggedIn = async () => {
    const request = {
        credentials: 'include',
        method: 'GET',
    }

    var response = await fetch('/api/checkauth/', request);
    return response.status !== 401;
}

export default Routes;

