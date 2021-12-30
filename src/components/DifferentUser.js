import React from 'react';
import axios from 'axios';
import profilePicture from './profilepicture.jpg'
import Edit from './Edit'

const username = localStorage.getItem('searchedUsername')
const email = localStorage.getItem('searchedEmail')
const userID = localStorage.getItem('searchedUserID')

export default class DifferentUser extends React.Component {

    state = {
        posts: [],
        editProfile: false,
        createPost: false,
    }

    componentDidMount() {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${userID}`;
            axios.get(URL)
            .then(response => {

                this.setState({ 
                    posts: response.data.reverse()
                })
            }).catch((err) => {console.log(err)})
        }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        
        const post = JSON.stringify({
            text: this.state.text,
            likes: 0,
            postedBy: userID
        })

        const URL = `https://hosted-api-website.herokuapp.com/api/posts/`;
        axios.post(URL, post, { 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }


    render() {
        return(

            <div className="h-screen">
                <div className="mb-auto mx-[500px] my-5">
                    
                    <div>
                        <header className="flex m-5">
                            <div className="flex-none m-4 w-[200px]">
                                <img className=" border-2 rounded-full" src={profilePicture} alt="Profile" />
                            </div>

                            <div className="flex-none mt-20 mx-2 w-[300px]">
                                <h1 className="font-light text-2xl">
                                    {username}
                                </h1>
                                
                                <h1 className="text-gray-400 font-normal text-md">
                                    {email}
                                </h1>
                            </div>

                        </header>

                        <hr />

                        {this.state.editProfile ? <Edit id={userID} /> : 
                    
                        <div className="mt-5">
                            <div className="w-full h-[450px] px-5 h-fit">
                                
                                <div className="rounded-sm border-gray-300 pl-5 py-2">
                                    <h1 className="text-3xl">
                                        {username}'s Posts
                                    </h1>
                                </div>
                                
                                <hr />

                                {this.state.posts.map(post => (
                                    <div className="mt-2"
                                    key={post._id}>
                                        <div className="border-[1px]">
                                            <div className="pl-[16px] pr-[16px] mt-2">
                                                {post.text}
                                            </div>

                                            <hr className="mt-3"/>
                                            <div className="ml-3 my-2">
                                                <div className="font-semibold mb-2">
                                                    {post.likes.length} likes
                                                </div>

                                                <div className="text-gray-500 text-sm mb-2">
                                                    {post.date}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        }

                    </div>

                </div>

                <div className="pb-5 pt-20 w-full text-center text-sm bottom-0 static">
                        <div className="text-gray-500">
                            © 2021 Mark Angelo Cruz
                        </div>
                </div>

            </div>
        )
    }
}