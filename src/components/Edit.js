import axios from 'axios';
import React from 'react';
import profile from './profilepicture.jpg'
import { Redirect } from "react-router-dom";

export default class Edit extends React.Component {

    state = {
        newUsername: undefined,
        newEmail: undefined,
        newDesc: undefined,
        changePassword: false,
        newPassword: undefined,
        confirmPassword: undefined,
        isFinish: false,
        passwordError: false
    }

    componentDidMount() {
        this.setState({
            isFinish: false
        })
    }

    handleChangePassword = () => {
        this.setState({ changePassword: true })
    }

    handleEditProfile = () => {
        this.setState({ changePassword: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let passwordValid = false;

        if (this.state.newPassword === this.state.confirmPassword) {
            passwordValid = true
        } else {
            this.setState({
                passwordError: true
            })
        }

        const updateUser = {
            userId: this.props.userData._id,
            username: this.state.newUsername,
            email: this.state.newEmail,
            desc: this.state.newDesc,
            password: this.state.newPassword
        }

        if (passwordValid || this.state.newPassword === undefined) {
            const URL = `http://localhost:3000/api/users/${this.props.userData._id}`;
            axios.put(URL, updateUser)
                .then(response => { 
                    console.log(response)
                    this.setState({
                        isFinish: true
                    })
                }).catch (err => {
                    console.log(err)
                });
            window.history.pushState({}, null, `/profile/${this.props.userData.username}`)
        }
    }

    render() {

        if (this.state.isFinish) {
            return (<Redirect exact to={`/profile/${this.props.userData.username}`} />)
        }

        return (
            <div className="flex justify-center mt-8">
                <div className="flex border-[1px] rounded-sm bg-[#f8f8ff] h-[375px]">
                    
                    <div className='flex flex-col border-r-[1px] text-lg w-[200px]'>
                        
                        <button className='pt-3 pb-3 pl-3 text-left hover:bg-gray-300 focus:border-l-[2px] border-black '
                        onClick={this.handleEditProfile}>
                            Edit Profile
                        </button>

                        <button onClick={this.handleChangePassword}
                        className='text-left pt-3 pb-3 pl-3 text-left hover:bg-gray-300 focus:border-l-[2px] border-black '>
                            Change Password
                        </button>

                    </div>
                    
                    <div className='flex flex-col justify-center my-10 w-[400px] gap-y-3'>

                        <div className='flex justify-center items-center gap-x-2 mb-3'>
                            <img src={profile}
                            className='w-[70px] rounded-full'
                            alt="Profile"/>

                            <div className='font-semibold'>
                                <div>
                                    {this.props.userData.username}
                                </div>
                                <div>
                                    <button className='text-sm text-blue-400 font-semibold'>
                                        Change Profile Picture
                                    </button>
                                </div>
                                
                            </div>
                        </div>

                        {!this.state.changePassword ? 
                        <form onSubmit={this.handleSubmit}
                        >
                            <div className='flex justify-center gap-x-5 mb-6'>

                                
                                <div className="flex flex-col gap-y-8 items-end font-semibold">
                                    <div className="">
                                        Username
                                    </div>
                                    <div className="">
                                        Email
                                    </div>
                                    <div className="">
                                        Bio
                                    </div>
                                    
                                </div>


                                <div className="flex flex-col gap-y-6 items-start">
                                    
                                    <div className="rounded-sm">
                                        <input className="pl-2 py-1 w-[200px] bg-inherit outline-0 border-[1px] border-gray-300 text-sm rounded-sm" 
                                        placeholder={this.props.userData.username}
                                        value={this.state.newUsername}
                                        name="newUsername"
                                        onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="rounded-sm">
                                        <input className="pl-2 py-1 w-[200px] bg-inherit outline-0 border-[1px] border-gray-300 text-sm rounded-sm" 
                                        placeholder={this.props.userData.email}
                                        value={this.state.newEmail}
                                        name="newEmail"
                                        onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="rounded-sm">
                                        <textarea className="w-[200px] pl-2 py-1 w-42 bg-inherit outline-0 border-[1px] border-gray-300 text-sm rounded-sm" 
                                        placeholder={this.props.userData.desc ? this.props.userData.desc : "Enter a bio"}
                                        value={this.state.newDesc}
                                        name="newDesc"
                                        onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="text-md text-center mt-2">
                                <button className="text-white bg-blue-500 px-3 py-1 rounded"
                                type="submit"
                                >
                                    Submit
                                </button>
                            </div>


                        </form> : 

                        <div>
                            <form onSubmit={this.handleSubmit}
                            >
                                <div className='flex justify-center gap-x-4'>
                                    <div className="flex flex-col gap-y-5 items-end">
                                        <div className="font-semibold">
                                            New Password
                                        </div>

                                        <div className="font-semibold">
                                            Confirm Password
                                        </div>
                                        
                                    </div>


                                    <div className="flex flex-col gap-y-3 items-start">
                                        
                                        <div className="rounded-sm">
                                            <input className="pl-3 py-1 w-42 bg-inherit outline-0 border-[1px] border-gray-300 text-sm rounded-sm" 
                                            type="password"
                                            placeholder= "·········"
                                            value={this.state.newPassword}
                                            name="newPassword"
                                            onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="rounded-sm">
                                            <input className="pl-3 py-1 w-42 bg-inherit outline-0 border-[1px] border-gray-300 text-sm rounded-sm" 
                                            type="password"
                                            placeholder= "·········"
                                            value={this.state.confirmPassword}
                                            name="confirmPassword"
                                            onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    

                                </div>

                                

                                <div className="text-md text-center">

                                {this.state.passwordError ? 
                                    <div className='text-center text-sm text-red-400 mt-1'>
                                        Passwords you entered do not match
                                    </div> : null }
                                    
                                    <button className="text-white bg-blue-500 px-3 py-1 rounded-md mt-5"
                                    type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </div> }
                    </div>
                </div>
            </div>
        )
    }
}