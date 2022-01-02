import React from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import profile from '../profile.jpg';
import home from '../home.png';
import signout from '../signout.png'


const initialState = {
    username: "",
    email: "",
    userID: "",
    isLoginValid: false,
    userNotFound: false
}

const token = localStorage.getItem('token')

export default class Navbar extends React.Component {

    state = {
        searchText: "",
        users: []
    }

    componentDidMount() {
        
        const userURL = `https://hosted-api-website.herokuapp.com/api/users`;
        axios.get(userURL, { headers: { 'Authorization': `Bearer ${token}`} })
            .then(response => {
                this.setState({ 
                    users: response.data,
                })
            })
        }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.users.forEach(user => {
            if (this.state.searchText === user.username) {

                localStorage.setItem('searchedUsername', user.username);
                localStorage.setItem('searchedEmail', user.email);
                localStorage.setItem('searchedUserID', user._id);

                <Redirect to="/differentUser" id={user._id}/>
            } else {
                this.setState({ userNotFound: true })
            }
        });
    }

    render() {
        return ( 
            <div className="border-[1px] sticky">
                    <div className="flex mx-[500px] gap-x-3 items-center">
                        <div className="flex-none w-fit content-end">
                            <form onSubmit={this.handleSubmit}>

                                {this.state.userNotFound ? 
                                <input 
                                className="bg-gray-200 outline-0 px-2 border-gray-300 border-[1px] "
                                placeholder="User not found..."
                                value={this.state.searchText}
                                name="searchText"
                                onChange={this.handleChange}
                                /> :
                                <input 
                                className="bg-gray-200 outline-0 px-2 border-gray-300 border-[1px] "
                                placeholder="Search..."
                                value={this.state.searchText}
                                name="searchText"
                                onChange={this.handleChange}
                                    /> }
                             </form>
                        </div>
                        <div className="flex-none">
                            <button className="text-lg"> 
                                <Link to="home">
                                    <img className="w-[35px]" src={home} />
                                </Link>
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg">
                                <Link to="profile">
                                <img className="w-[45px]" src={profile} />
                                </Link>
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg"
                            onClick={() => 
                            this.props.handleSignOut(initialState.username, initialState.email, initialState.userID, initialState.isLoginValid)}>
                                <Link to="login">
                                    <img className="w-[30px]" src={signout} />
                                </Link>
                            </button>
                        </div>

                        
                    </div>
            </div>
        )
    }
}