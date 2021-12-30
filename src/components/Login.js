import React from 'react';
import networkImage from '../networkimage.png';
import CreateAnAccount from './CreateAnAccount';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

      constructor(props) {
        super(props)

        this.handler = this.handler.bind(this);
        this.userNotFoundHandler = this.userNotFoundHandler.bind(this);
        this.isValidHandler = this.isValidHandler.bind(this);
        this.state = {
            username: "",
            email: "",
            password: "",
            forgotPassword: false,
            createAnAccount: false,
            isValid: false,
            userNotFound: false,
            incorrectPassword: false
        }
      }

      componentDidMount() {

        localStorage.clear();
        document.body.style.backgroundColor = "#ffffff"
        
        this.setState({
            username: "",
            email: "",
            password: "",
            forgotPassword: false,
            createAnAccount: false,
            isValid: false,
            userNotFound: false,
            incorrectPassword: false
        })
      }

      handleChange = (event) => {
          this.setState({
              [event.target.name]: event.target.value
          })
      }

      handleSubmit = (event) => {
        event.preventDefault();

        let username;
        let email;
        let password;
        let id;

        this.setState({
            isValid: false,
            incorrectPassword: false,
            userNotFound: false
        })

        const URL = `https://hosted-api-website.herokuapp.com/api/users/${this.state.email}`;
        axios.get(URL)
            .then(response => {
                try {
                    username = response.data.username;
                    email = response.data.email;
                    password = response.data.password;
                    id = response.data._id;

                    if (this.state.email === email) {
                        if (this.state.password === password) {
                                this.setState({
                                    isValid: true
                                });

                                localStorage.setItem('username', username);
                                localStorage.setItem('email', email);
                                localStorage.setItem('userID', id);
                                localStorage.setItem('isLoginValid', password);

                                this.props.onLogin(username, email, id, this.state.isValid);

                            } else {
                                this.setState({
                                    incorrectPassword: !this.state.incorrectPassword
                                });
                            } 
                    } else {
                        this.setState({
                            userNotFound: !this.state.userNotFound
                        });
                    }
                } catch {
                    this.setState({
                        userNotFound: !this.state.userNotFound
                    });
                }
            }).catch (err => {
                console.log(err)
            });
    }

  handler() {
      this.setState({
          createAnAccount: false,
          forgotPassword: false
      })
  }

  userNotFoundHandler() {
      this.setState({
          userNotFound: true
      })
  }

  isValidHandler() {
      this.setState({
          isValid: true
      })
  }

    render() {

      if (this.state.isValid) {
        return (
            <Redirect to='/profile'/>
        )
      }

      if (this.state.createAnAccount || this.state.forgotPassword) {
          return (
            <div className="flex justify-center items-center h-screen">
              <div className="flex-none bg-gray-100 w-fit h-85 rounded p-10 mx-24 shadow-lg border-[1px]">
                <div className="text-center">
                  <CreateAnAccount action={this.handler} userNotFound={this.userNotFoundHandler} isValidHandler={this.isValidHandler}/> 
                </div>
              </div>

              <div className="flex-none w-[600px] rounded animate-pulse">
                <img alt="Network" src={networkImage}/>
              </div>

            </div>
          )
      }

        return (
          <div className="flex justify-center items-center h-screen">
            <div className="flex-none bg-gray-100 w-fit h-85 rounded p-10 mx-24 shadow-lg border-[1px]">
              <div className="text-center">
                  <form onSubmit={this.handleSubmit}>
                      <div>
                          <input
                              name="email"
                              className="text-xl w-72 h-12 p-3 mb-1 rounded-sm border-[1px] outline-0" 
                              placeholder="Email address" 
                              value={this.state.email} 
                              onChange={this.handleChange}>
                          </input>
                      </div>

                      {this.state.userNotFound ? 
                      <div>
                          <h1 className="text-sm text-red-500">
                              The email you’ve entered is not found.
                          </h1>
                      </div> : null}

                      <div>
                          <input
                              name="password"
                              className="text-xl w-72 h-12 p-3 mt-2 mb-1 rounded-sm border-[1px] outline-0" 
                              placeholder="Password" 
                              value={this.state.password} 
                              type="password"
                              onChange={this.handleChange}>
                          </input>
                      </div>
                      
                      {this.state.incorrectPassword ? 
                      <div>
                          <h1 className="text-sm text-red-500">
                              The password you’ve entered is incorrect.
                          </h1>
                      </div> : null}
              
                      <button
                          className="bg-blue-500 w-full px-4 py-2 mt-3 mb-2 rounded text-white font-bold" 
                          type="submit">
                              Log In
                      </button>
                  </form>

                  <div>
                      <h1 
                      className="text-blue-500 text-sm mb-5">
                          <button onClick={() => this.setState({
                              forgotPassword: !this.state.forgotPassword
                          })}>
                              Forgot password?
                          </button>
                      </h1>
                  </div>

                  {!this.state.incorrectPassword ? <hr /> : null}

                  <button onClick={() => this.setState({
                      createAnAccount: !this.state.createAnAccount
                  })}
                  className="bg-green-500 w-full px-4 py-2 mt-5 rounded text-white font-bold">
                      Create an account
                  </button>
              </div>
            </div>
    
            <div className="flex-none w-[600px] rounded animate-pulse">
              <img alt="Network" src={networkImage}/>
            </div>
          </div> 
        )
    }
}