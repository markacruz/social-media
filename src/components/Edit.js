import axios from 'axios';
import React from 'react';

export default class Edit extends React.Component {

    state = {
        newUsername: "",
        newEmail: "",
        changePassword: false,
        newPassword: ""
    }

    handleChangePassword = () => {
        this.setState({ changePassword: !this.state.changePassword })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const URL = `https://hosted-api-website.herokuapp.com/api/users/${this.props.id}`;
        axios.patch(URL, {
            username: this.state.newUsername,
            email: this.state.newEmail,
            password: this.state.newPassword,
        })
            .then( response => { 
                window.location.reload(false);
            }).catch (err => {
                console.log(err)
            });   
    }

    render() {
        return (
            
            <div className="px-48">
                <div className="justify-center items-center border-[1px] rounded-sm py-4 px-10 bg-[#f8f8ff] fixed">
                    <div className="text-2xl">
                        Edit Profile
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="flex ml-14 text-lg gap-x-10 mt-2 mb-2">
                            <div className="flex-none mt-3">
                                Change Username
                            </div>
                            <div className="flex-none rounded-sm">
                                <input className="pl-3 py-2 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400 text-sm" 
                                placeholder="Enter new username"
                                value={this.state.newUsername}
                                name="newUsername"
                                onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="flex ml-14 text-lg gap-x-10 mt-2 mb-2">
                            <div className="flex-none mt-3">
                                Change Email
                            </div>
                            <div className="flex-none rounded-sm">
                                <input className="pl-3 py-2 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400 text-sm" 
                                placeholder="Enter new email address"
                                value={this.state.newEmail}
                                name="newEmail"
                                onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="text-md text-center mt-5">
                            <button className="text-black bg-gray-200 border-gray-300 border-[1px] px-3 py-1 rounded-sm"
                            onClick={this.handleChangePassword}>
                                Change Password
                            </button>
                        </div>

                        {this.state.changePassword ? 
                        <div>
                            <div className="flex ml-14 text-lg gap-x-10 mt-2 mb-2">
                                <div className="flex-none mt-3">
                                    Enter Password
                                </div>
                                <div className="flex-none rounded-sm">
                                    <input className="pl-3 py-2 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400 text-sm" placeholder="Enter new password"/>
                                </div>
                            </div>

                            <hr />

                            <div className="flex ml-14 text-lg gap-x-10 mt-2 mb-2">
                                <div className="flex-none mt-3">
                                    Confirm Password
                                </div>
                                <div className="flex-none rounded-sm">
                                    <input className="pl-3 py-2 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400 text-sm" placeholder="Confirm new password"/>
                                </div>
                            </div>

                        </div> : null}

                        <div className="text-md text-center mt-2">
                            <button className="text-white border-[1px] bg-blue-500 px-3 py-1 rounded-sm"
                            type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}