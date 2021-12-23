import React from 'react';
import axios from 'axios';

export default class CreateAnAccount extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        const user = JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })

        const URL = `https://hosted-api-website.herokuapp.com/api/users/`;
        axios.post(URL, user, { 
            headers: {
            'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.isValid();
                } else {
                    this.setState({
                        error: response.status + ": " + response.statusText
                    })
                }
            }).catch (err => {
                console.log(err)
            });
    }

    render() {


        return (
            <div className="text-center">

                {(this.state.error) ? <div className="text-red-500 text-sm mb-1">{this.state.error}</div> : null}

                <form onSubmit={this.handleSubmit}>
                    <div>
                    <input
                        name="username"
                        className="text-xl w-72 p-3 h-12 mb-3 rounded-sm border-[1px]" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleChange}>
                    </input>
                    </div>

                    <div>
                        <input
                            name="email"
                            className="text-xl w-72 p-3 h-12 mb-3 rounded-sm border-[1px]" 
                            placeholder="Email Address" 
                            value={this.state.email} 
                            onChange={this.handleChange}>
                        </input>
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            className="text-xl w-72 h-12 p-3 mb-3 rounded-sm border-[1px]" 
                            placeholder="Enter your password" 
                            value={this.state.password} 
                            onChange={this.handleChange}>
                        </input>
                    </div>

                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="text-xl w-72 h-12 p-3 mb-5 rounded-sm border-[1px]" 
                            placeholder="Re-enter your password" 
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange}>
                        </input>
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