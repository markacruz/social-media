import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CreateAnAccount extends React.Component {

    state = {
        users: [],

        username: "",
        email: "",
        password: "",
        confirmPassword: "",

        usernameError: false,
        emailError: false,
        passwordLengthError: false,
        passwordConfirmError: false,

        backToLogin: false,
        isValid: false,
        error: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if (this.state.username.length < 3) this.setState({ usernameError: true });
        if (!this.state.email.includes('@')) this.setState({ emailError: true });
        if (this.state.password.length < 6) this.setState({ passwordLengthError: true })
        if (this.state.password !== this.state.confirmPassword) this.setState({ passwordConfirmError: true })

        if (this.state.usernameError === false) {
            if (this.state.emailError === false) {
                if (this.state.passwordLengthError === false) {
                    if (this.state.passwordConfirmError === false) {
                        isValid = true;
                    }
                }
            }
        }

        if (isValid) {

            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
    
            const URL = `http://localhost:3000/api/auth/register`;
            axios.post(URL, user)
                .then(response => {
                    if (response.status === 200) {
                        this.props.isValidHandler();
                    } else {
                        this.setState({
                            error: response.status + ": " + response.statusText
                        })
                    }
                }).catch (err => {
                    console.log(err)
                });
        }
    }

    render() {

        if (this.props.isLoginValid) {
            console.log('Im in!')
            return (
                <Redirect exact to={`/home`}/>
            )
          }
        
        return (
            <div className="text-center">

                {(this.state.error) ? <div className="text-red-500 text-sm mb-1">{this.state.error}</div> : null}

                <form onSubmit={this.handleSubmit}>
                    <div>
                    <input
                        name="username"
                        className="text-xl w-72 p-3 mb-2 h-12 rounded-sm border-[1px] outline-0" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleChange}>
                    </input>

                        {this.state.usernameError ?
                        <div className="text-sm text-red-500 mb-2">
                            Username must be longer than 3 characters
                        </div> : null}

                    </div>

                    <div>
                        <input
                            name="email"
                            className="text-xl w-72 p-3 h-12 mb-2 rounded-sm border-[1px] outline-0" 
                            placeholder="Email Address" 
                            value={this.state.email} 
                            onChange={this.handleChange}>
                        </input>

                        {this.state.emailError ?
                        <div className="text-sm text-red-500 mb-2">
                            Enter a valid email address
                        </div> : null}

                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            className="text-xl w-72 h-12 p-3 mb-2 rounded-sm border-[1px] outline-0" 
                            placeholder="Enter your password" 
                            value={this.state.password} 
                            onChange={this.handleChange}>
                        </input>

                        {this.state.passwordLengthError ?
                        <div className="text-sm text-red-500 mb-2">
                            Password must be atleast 6 characters long
                        </div> : null}
                    </div>

                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="text-xl w-72 h-12 p-3 mb-2 rounded-sm border-[1px] outline-0" 
                            placeholder="Re-enter your password" 
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange}>
                        </input>
                        {this.state.passwordConfirmError ?
                        <div className="text-sm text-red-500 mb-2">
                            The passwords you entered do not match
                        </div> : null}
                    </div>

                    <hr />
                
                    <button
                        className="bg-green-500 w-full px-4 py-2 mt-5 rounded text-white font-bold" 
                        type="submit">
                            Create account
                    </button>
                </form> 

                <button
                className="bg-blue-500 w-60 px-4 py-2 mt-4 rounded text-white font-bold"
                onClick={this.props.action}
                >
                    Back to Log In
                </button>
            </div>
        )
    }
}