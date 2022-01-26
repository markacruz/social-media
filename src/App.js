import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Edit from './components/Edit'

export default class App extends React.Component {

  state = {
    authToken: process.env.REACT_APP_AUTH_TOKEN,
    userData: [],
    isLoginValid: false
  }

  handleLogin = (_userData, _isLoginValid) => {
    this.setState({
      userData: _userData,
      isLoginValid: _isLoginValid
    });
  }

  handleSignOut = () => {
    this.setState({
      isLoginValid: false,
      userData: []
    });
  }

  render() {
    return (

      <Router>
        <Switch>

          <Route exact path="/">
            <Login isLoginValid={this.state.isLoginValid} onLogin={this.handleLogin} />
          </Route>

          {this.state.isLoginValid &&
          <Route exact path="/home">
              <Navbar userData={this.state.userData} handleSignOut={this.handleSignOut}/>
              <Home userData={this.state.userData} />
          </Route> }

          {this.state.isLoginValid &&
          <Route exact path="/profile/:username">
              <Navbar userData={this.state.userData} handleSignOut={this.handleSignOut}/>
              <Profile userData={this.state.userData}/>
          </Route> }

          {this.state.isLoginValid &&
          <Route exact path="/edit/:username">
              <Navbar userData={this.state.userData} handleSignOut={this.handleSignOut}/>
              <Edit userData={this.state.userData}/>
          </Route> }

        </Switch>
      </Router>

    );
  }
}