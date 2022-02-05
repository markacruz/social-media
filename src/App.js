import React from 'react';
import { Redirect , HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Cookies from 'js-cookie';

const isValid = Cookies.get("isValid")
const userData = {
  _id: Cookies.get("id"),
  username: Cookies.get("username"),
  email: Cookies.get("email"),
}

export default class App extends React.Component {

  handleSignOut = () => {
    Cookies.remove('isValid')
    Cookies.remove('id')
    Cookies.remove('username')
    Cookies.remove('email')
  }

  render() {
    return (

      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route> 

          {isValid ? 
          <Route exact path="/home">
              <Navbar userData={userData} handleSignOut={this.handleSignOut}/>
              <Home userData={userData} />
          </Route> :
          <Redirect exact to='/' />
          }

          {isValid ?
          <Route exact path="/profile/:username">
              <Navbar userData={userData} handleSignOut={this.handleSignOut}/>
              <Profile userData={userData}/>
          </Route> :
          <Redirect exact to='/' />
          }

          {isValid ?
          <Route exact path="/edit/:username">
              <Navbar userData={userData} handleSignOut={this.handleSignOut}/>
              <Edit userData={userData}/>
          </Route> :
          <Redirect exact to='/' />}

        </Switch>
      </Router>

    );
  }
}