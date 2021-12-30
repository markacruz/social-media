import React from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';


const initialState = {
    username: "",
    email: "",
    userID: "",
    isLoginValid: false,
    userNotFound: false
    
}

export default class Navbar extends React.Component {

    state = {
        searchText: "",
        users: []
    }

    componentDidMount() {
        const userURL = `https://hosted-api-website.herokuapp.com/api/users`;
        axios.get(userURL)
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

    handleSubmit = () => {

        this.state.users.forEach(user => {
            if (this.state.searchText === user.username) {

                localStorage.setItem('searchedUsername', user.username);
                localStorage.setItem('searchedEmail', user.email);
                localStorage.setItem('searchedUserID', user._id);

                <Redirect to="/differentUser" id={user._id}/>
            }
            this.setState({ userNotFound: true })
        });
    }

    render() {
        return ( 
            <div className="border-[1px] sticky">
                    <div className="flex mx-[500px] my-2 gap-x-4">

                        <div className="flex-none">
                            <button className="text-lg"> 
                                <Link to="home">
                                    Home
                                </Link>
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg">
                                <Link to="profile">
                                    Profile
                                </Link>
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg"
                            onClick={() => 
                            this.props.handleSignOut(initialState.username, initialState.email, initialState.userID, initialState.isLoginValid)}>
                                <Link to="login">
                                    Sign Out
                                </Link>
                            </button>
                        </div>

                        <div className="flex-none w-fit content-end">
                            <form onSubmit={this.handleSubmit}>
                                <input 
                                className="bg-gray-200 outline-0 px-2 border-gray-300 border-[1px] "
                                placeholder="Search..."
                                value={this.state.searchText}
                                name="searchText"
                                onChange={this.handleChange}
                                    />
                             </form>
                        </div>
                    </div>
            </div>
        )
    }
}