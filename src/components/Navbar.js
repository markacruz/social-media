import React from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import profile from './profilepicture.jpg';
import home from '../home.png';
import message from '../message.png';
import signout from '../signout.png';
import ReactDOM from 'react-dom';
import githubLogo from '../github.png';

export default class Navbar extends React.Component {

    state = {
        searchUser: "",
        searchResult: [],
        showSearch: false,
        noUserFound: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleSearchClick = () => {
        this.setState({
            showSearch: true
        })
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
    
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                searchUser: "",
                showSearch: false
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const findUserURL = `https://hosted-api-website.herokuapp.com/api/users?username=${this.state.searchUser}`
        axios.get(findUserURL)
        .then(response => {
            this.setState({ 
                searchResult: response.data
            })
        })
    }

    render() {

        return ( 
            <div className="border-[1px]">
                    <div className="flex mx-1/2 justify-center items-center px-4">
                        
                        <div className='font-thin text-xl bg-blue-500 text-white px-4 py-2 rounded-lg
                                        sm:hidden'>
                            <Link to="/home">
                                Social Media.
                            </Link>
                        </div>

                        <div className='w-1/12'/>
                        
                        <div className="w-fit content-end">
                            <form onSubmit={this.handleSubmit}>
                                <input 
                                className="bg-gray-200 outline-0 w-[240px] px-6 py-2 border-gray-300 border-[1px] rounded-xl font-thin"
                                placeholder="Search"
                                value={this.state.searchText}
                                name="searchUser"
                                onChange={this.handleChange}
                                onClick={this.handleSearchClick}
                                autoComplete='off'
                                    />
                             </form>

                             {this.state.showSearch ? 
                                <div className='absolute bg-white w-[240px] border-[1px] mt-2 p-3'>
                                        {this.state.searchResult.length !== 0 && this.state.searchUser === this.state.searchResult.username ? 
                                        <div className='flex items-center gap-x-2'>
                                            <div>
                                                <img src={profile} 
                                                className='w-[40px] rounded-full'/>
                                            </div>
                                            <div className='flex-col leading-none'>
                                                
                                                <Link to={`/profile/${this.state.searchResult.username}`} >
                                                    <h1 className='font-semibold'
                                                    >
                                                        {this.state.searchResult.username}
                                                    </h1>
                                                </Link>
                                                                                         
                                                <Link to={`/profile/${this.state.searchResult.username}`} >
                                                    <h1 className='text-sm text-gray-300'
                                                    >
                                                        {this.state.searchResult.email}
                                                    </h1>  
                                                </Link>
                        
                                            </div>
                                        </div> : 
                                        <div className='font-semibold'>
                                            No user found
                                        </div> }
                                </div> : null }
                        </div>     

                        <div className='w-1/12' />

                        <div className="">
                            <button className="text-lg"> 
                                <Link to="/home">
                                    <img className="w-[50px] mr-2" src={home} />
                                </Link>
                            </button>
                        </div>

                        <div className="">
                            <button className="text-lg">
                                <Link to={`/profile/${this.props.userData.username}`}>
                                <img className="w-[35px] mr-2 rounded-full" src={profile} />
                                </Link>
                            </button>
                        </div>

                        <div className="">
                            <button className="text-lg">
                                <Link to={`/profile/${this.props.userData.username}`}>
                                <img className="w-[60px] mr-2 rounded-full" src={message} />
                                </Link>
                            </button>
                        </div>

                        <div className="">
                            <button className="text-lg"
                            onClick={this.props.handleSignOut}>
                                <Link to="/">
                                    <img className="w-[27.5px] " src={signout} />
                                </Link>
                            </button>
                        </div>                                         
                    </div>
            </div>
        )
    }
}