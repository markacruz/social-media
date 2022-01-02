import React from 'react';
import axios from 'axios';
import profilePicture from './profilepicture.jpg'
import Edit from './Edit'

const username = localStorage.getItem('username')
const email = localStorage.getItem('email')
const userID = localStorage.getItem('userID')

const token = localStorage.getItem('token');

export default class Profile extends React.Component {

    state = {
        posts: [],
        editProfile: false,
        createPost: false,
        text: ""
    }

    componentWillMount() {
        
        document.body.style.backgroundColor = "#f8f8ff";
        
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${userID}`;
        axios.get(URL)
        .then(response => {

            this.setState({ 
                posts: response.data.reverse()
            })
        }).catch((err) => {console.log(err)})
    }

    handleEditProfile = () => {
        this.setState({
            editProfile: !this.state.editProfile
        })
    }

    handleCreatePost = () => {
        this.setState({
            createPost: !this.state.createPost
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let post = JSON.stringify({
            text: this.state.text,
            postedBy: userID
        })

        const URL = `https://hosted-api-website.herokuapp.com/api/posts`;
        axios.post(URL, post, {
            headers: {
            'Content-Type': 'application/json',
            }
        })

        this.setState({ text: "" })
    }

    handleDelete = (id) => {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;
        axios.delete(URL)
            .then(response => {
                window.location.reload(false);
            }).catch (err => {
                console.log(err)
            });
        }

    render() {
        return(
            <div className="flex flex-col h-[95vh]">
                <div className="flex mb-auto mx-[500px]">
                    <div>
                        <div>

                         {this.state.editProfile ? <Edit id={userID} /> : null } 


                        <header className="flex m-5">
                            <div className="flex-none m-4 w-[200px]">
                                <img className=" border-2 rounded-full" src={profilePicture} alt="Profile" />
                            </div>

                            <div className="flex-none mt-20 mx-2 w-[300px]">
                                <h1 className="font-light text-2xl" id="username">
                                    {username}
                                </h1>
                                
                                <h1 className="text-gray-400 font-normal text-md" id="email">
                                    {email}
                                </h1>
                            </div>

                            <div className="flex-none w-fit">
                                <button className="text-md border-[1px] border-gray-300 bg-gray-200 rounded-sm mt-4 mx-[200px] p-2"
                                onClick={this.handleEditProfile}>
                                    Edit Profile
                                </button>
                            </div>

                            
                        </header>

                        </div>

                        <hr />

                        
                    
                        <div className="flex gap-x-10 mt-5">
                            <div className="flex-none w-[650px] h-[450px] px-5 h-fit">
                                
                                <div className="rounded-sm border-gray-300 pl-5 py-2">
                                    <h1 className="text-3xl">
                                        Your Posts
                                    </h1>
                                </div>
                                
                                <hr />

                                {this.state.posts.length === 0 ? 

                                <div className="mx-4 mt-2 text-lg">
                                    No posts yet...
                                </div>

                                : null}

                        
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

                                                <button className="text-white bg-red-500 rounded-sm px-3 mb-2"
                                                onClick={() => this.handleDelete(post._id)}>
                                                    Delete
                                                </button>

                                                <div className="text-gray-500 text-sm mb-2">
                                                    {post.date}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))} 

                            </div>

                            <div className="flex-none w-[200px]">
                                <div className="justify-center items-center">
                                    <button className="bg-blue-500 w-full p-2 text-white rounded-sm"
                                    onClick={this.handleCreatePost}>
                                        + Create a Post
                                    </button>
                                    {this.state.createPost ? 
                                <form className="w-full bg-gray-200"
                                onSubmit={this.handleSubmit}>
                                    <div className='text-center'>
                                        <textarea className="px-2 mt-4 h-32 w-42 outline-0 rounded-sm resize-none"
                                        placeholder="What's on your mind?" 
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.handleChange}/>
                                    </div>
                                    
                                    <div className='px-3'>
                                        <button className="bg-blue-500 text-white px-2 rounded-sm mb-2">
                                            Post
                                        </button>
                                    </div>
                                </form> : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-5 pt-20 w-full text-center text-sm">
                        <div className="text-gray-500">
                            © 2021 Mark Angelo Cruz
                        </div>
                </div>
                

                

            </div>
        )
    }
}