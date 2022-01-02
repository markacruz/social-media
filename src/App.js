import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DifferentUser from './components/DifferentUser';

const isLoginValid = localStorage.getItem("isLoginValid")


export default class App extends React.Component {

  state = {
    username: "",
    email: "",
    userID: "",
    isLoginValid: false,
    authToken: process.env.REACT_APP_AUTH_TOKEN
  }

  handleLogin = (_username, _email, _userID, _isLoginValid) => {
    this.setState({
      username: _username,
      email: _email,
      userID: _userID,
      isLoginValid: _isLoginValid
    });
  }

  handleSignOut = (_username, _email, _userID, _isLoginValid) => {
    this.setState({
      username: _username,
      email: _email,
      userID: _userID,
      isLoginValid: _isLoginValid
    });

    localStorage.clear();

  }

  render() {
    return (

      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>

          <Route exact path="/login">
            <Login token={this.state.authToken} onLogin={this.handleLogin} />
          </Route>

          {isLoginValid &&
          <Route exact path="/home">
              <Navbar handleSignOut={this.handleSignOut}/>
              <Home token={this.state.authToken} id={this.state.userID} username={this.state.username} email={this.state.email} />
          </Route> }

          {isLoginValid &&
          <Route exact path="/profile">
              <Navbar handleSignOut={this.handleSignOut}/>
              <Profile token={this.state.authToken}  id={this.state.userID} username={this.state.username} email={this.state.email}/>
          </Route> }

          {isLoginValid &&
          <Route exact path="/differentUser">
              <Navbar handleSignOut={this.handleSignOut}/>
              <DifferentUser token={this.state.authToken} id={this.state.userID} username={this.state.username} email={this.state.email}/>
          </Route> }


        </Switch>
      </Router>

    );
  }
}