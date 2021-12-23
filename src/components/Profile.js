import React from 'react';
import axios from 'axios';
import profilePicture from './profilepicture.jpg'
import Modal from './Modal'
import Navbar from './Navbar'


export default class Profile extends React.Component {

    state = {
        username: "",
        email: "",
        editProfile: false
    }

    componentDidMount() {
        document.body.style.backgroundColor = "";
        const URL = `https://hosted-api-website.herokuapp.com/api/users/${this.props.email}`;
            axios.get(URL)
            .then(response => {

                const _username = response.data.username;
                const _email = response.data.email;

                this.setState({ 
                    username: _username,
                    email: _email
                })
            }).catch((err) => {console.log(err)})
        }

    handleEditProfile = (event) => {
        this.setState({
            editProfile: true
        })
    }

    
    render() {

        if (this.state.editProfile) {
            return (
                <Modal />                
            )
        }

        return(

            <div className="h-screen">
                
                <Navbar />

                <div className="mb-auto mx-[500px] my-5">
                    <div>
                        <header className="flex m-5">
                            <div className="flex-none m-4 w-[200px]">
                                <img className=" border-2 rounded-full" src={profilePicture} alt="Profile" />
                            </div>

                            <div className="flex-none mt-20 mx-2 w-[300px]">
                                <h1 className="font-light text-5xl">
                                    {this.state.username}
                                </h1>
                                
                                <h1 className="text-gray-400 font-normal text-lg">
                                    {this.state.email}
                                </h1>
                            </div>

                            <div className="flex-none w-fit">
                                <button className="text-md border-[1px] border-gray-300 bg-gray-200 rounded-sm mt-4 mx-[200px] p-2"
                                onClick={this.handleEditProfile}>
                                    Edit Profile
                                </button>
                            </div>

                        </header>

                        <hr />
                    
                        <div className="flex gap-x-10 mt-10">
                            <div className="flex-none w-[650px] h-[450px] px-5 py-3 h-fit bg-gray-200 rounded-sm border-[1px] border-gray-300">
                                
                                <div>
                                    <h1 className="text-3xl">
                                        Your Posts
                                    </h1>
                                </div>
                                
                                <hr className="mt-2"/>
                            </div>

                            <div className="flex-none w-[200px]">
                                <div className="justify-center items-center">
                                    <button className="bg-blue-500 w-full p-2 text-white rounded-sm">
                                        + Create a Post
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    

                </div>

                <div className="pb-5 pt-20 w-full text-center text-sm bottom-0 fixed">
                        <div className="text-gray-500">
                            © 2021 Mark Angelo Cruz
                        </div>
                </div>

            </div>
        )
    }
}