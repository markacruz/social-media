import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';

export default class App extends React.Component {

  state = {
    username: "markaycruz",
    email: "markaycruz@gmail.com",
    isLoginValid: true,
  }

  handleUser = (_username, _email, _isLoginValid) => {
    this.setState({
      username: _username,
      email: _email,
      isLoginValid: _isLoginValid
    });
  }

  render() {
    return (

      <Router>
        <Switch>
          <Route exact path="/login">
            <Login onLogin={this.handleUser} />
          </Route>

          { this.state.isLoginValid &&
          <Route exact path="/home">
              <Home username={this.state.username} email={this.state.email} />
          </Route> }

          { this.state.isLoginValid &&
          <Route exact path="/profile">
              <Profile username={this.state.username} email={this.state.email}/>
          </Route> }
          
          
          
        </Switch>
      </Router>

    );
  }
}