import React from 'react';
import axios from 'axios';
import profilePicture from './profilepicture.jpg'
import { withRouter, Redirect } from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: [],
            posts: [],
            text: "",
            editProfile: false,
            createPost: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (!(this.props.match.params.username === prevProps.match.params.username)) {
            const getUsersURL = `http://localhost:3000/api/users?username=${this.props.match.params.username}`
            axios.get(getUsersURL)
            .then(response => {
                this.setState({ 
                    user: response.data
                })
            }).catch((err) => {
                console.log(err)
            })

            const userPostsURL = `http://localhost:3000/api/posts/profile/${this.props.match.params.username}`;
            axios.get(userPostsURL)
            .then(response => {
                this.setState({ 
                    posts: response.data.reverse()
                })
            }).catch((err) => {
                console.log(err)
            })
        } 
    }

    componentDidMount() {
        
        this.setState({ editProfile: false })
        const getUsersURL = `http://localhost:3000/api/users?username=${this.props.match.params.username}`
        axios.get(getUsersURL)
        .then(response => {
            this.setState({ 
                user: response.data
            })
        }).catch((err) => {
            console.log(err)
        })

        const userPostsURL = `http://localhost:3000/api/posts/profile/${this.props.match.params.username}`;
        axios.get(userPostsURL)
        .then(response => {
            this.setState({ 
                posts: response.data.reverse()
            })
        }).catch((err) => {
            console.log(err)
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

    handleSubmit = (event) => {
        event.preventDefault()
        const reqPost = {
            userId: this.props.userData._id,
            desc: this.state.text,
        }

        const post = {
            userId: { _id: this.props.userData._id, username: this.props.userData.username},
            desc: this.state.text,
            likes: []
        }

        const URL = `http://localhost:3000/api/posts`;
        axios.post(URL, reqPost, {
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            this.setState(prevState => ({
                posts: [post ,...prevState.posts]
            }))
        })

        this.setState({ text: "" })
    }

    handleDelete = (id) => {
        const URL = `http://localhost:3000/api/posts/${id}`;
        axios.delete(URL, { data: { userId: this.props.userData._id }})
            .then(response => {
                console.log(response)
            }).catch (err => {
                console.log(err)
            });
        this.setState({
            posts: this.state.posts.filter(post => post._id !== id)
        })
    }

    handleEditProfileToggle = () => {
        this.setState({
            editProfile: true
        })
    }

    handleFollow = () => {
        const followURL = `http://localhost:3000/api/users/${this.state.user._id}/follow`
        axios.put(followURL, {
            userId: this.props.userData._id
        })
        .then(response => {
            console.log(response)
        }).catch(err => console.log(err))

        this.setState(prevState => ({
            user: [{...prevState.user, followers: this.state.user.followers.concat(this.props.userData._id)}]
        }))

    }

    handleUnfollow = () => {
        const followURL = `http://localhost:3000/api/users/${this.state.user._id}/unfollow`
        axios.put(followURL, {
            userId: this.props.userData._id
        })
        .then(response => {
            console.log(response)
        }).catch(err => console.log(err))

        

        this.setState(prevState => ({
            user: [{...prevState.user, followers: this.state.user.followers.filter(follower => follower !== this.props.userData._id)}]
        }))
        console.log(this.state.user)
    }

    handleLike = (id) => {
        const URL = `http://localhost:3000/api/posts/${id}/like`;
        axios.put(URL, { 
            userId: this.props.userData._id
        })
        .then(response => {
            console.log(response)
        })

        let specificLike = this.state.posts.find(post => post._id === id).likes

        if (specificLike.includes(this.props.userData._id)) {
            this.setState(prevState => ({
                posts: prevState.posts.map(
                    post => post._id === id ? {...post, likes: specificLike.filter(userId => userId !== this.props.userData._id)} : post
                )
            }))
        } else {
            this.setState(prevState => ({
                posts: prevState.posts.map(
                    post => post._id === id ? {...post, likes: specificLike.concat(this.props.userData._id)} : post
                )
            }))
        }
    }

    render() {

        if (this.state.editProfile) {
            return (<Redirect exact to={`/edit/${this.props.userData.username}`} />)
        }

        return(
            <div className=''>
                <div className="flex justify-center">
                    <div className='flex items-center gap-x-16 mt-5'>
                        <img src={profilePicture}
                        className='rounded-full w-[175px]'/>
                        <div>
                            <div className='flex items-center gap-x-4'>
                                <div className='text-[40px] font-thin'>
                                    {this.state.user.username}
                                </div>

                                {this.props.userData._id === this.state.user._id ? 

                                <div>   
                                    <button className='bg-gray-200 border-[1px] border-gray-300 rounded-sm py-1 px-2'
                                    onClick={this.handleEditProfileToggle}>
                                        Edit Profile
                                    </button>
                                </div> : 


                                <div>
                                    {this.state.user.followers !== undefined ? 
                                <div>  
                                    {!this.state.user.followers.includes(this.props.userData._id) ?
                                    <button className='bg-gray-200 border-[1px] border-gray-300 rounded-sm py-1 px-2'
                                    onClick={this.handleFollow}>
                                        Follow
                                    </button> :
                                    <button className='bg-gray-200 border-[1px] border-gray-300 rounded-sm py-1 px-2'
                                    onClick={this.handleUnfollow}>
                                        Unfollow
                                    </button> }
                                </div> : null }
                                </div>

                                
                                }
                                
                                
                            </div>
                            <div className='flex gap-x-7 mb-5'>
                                <div className='flex gap-x-1'>
                                    <h1 className='font-semibold'>
                                        {this.state.posts.length}
                                    </h1>
                                    <div>
                                        posts
                                    </div>
                                </div>
                                
                                {this.state.user.followers !== undefined ?
                                <div className='flex gap-x-1'>
                                    <h1 className='font-semibold'>
                                        {this.state.user.followers.length}
                                    </h1>
                                    <div>
                                        Followers
                                    </div>
                                </div> : null }

                                {this.state.user.followings !== undefined ?
                                <div className='flex gap-x-1'>
                                    <h1 className='font-semibold'>
                                        {this.state.user.followings.length}
                                    </h1>
                                    <div>
                                        Following
                                    </div>
                                </div>  : null }

                            </div>
                            <div className='font-semibold'>
                                {this.state.user.email}
                            </div>
                            <div className=''>
                                {this.state.user.desc ? this.state.user.desc : "User has no biography"}
                            </div>
                        </div>
                    </div>                
                </div> 
                
                <hr className='mx-[30%] mt-6 mb-2'/>

                <div className='flex justify-center'>
                    <div>
                        <input defaultChecked type="radio" name="option" id="posts" class="hidden" value="posts"/>
                        <label htmlFor="posts" class="label-checked:bg-gray-300 p-2 font-semibold mt-1 tracking-widest cursor-pointer">POSTS</label>
                    </div>
                    <div>
                        <input type="radio" name="option" id="comments" class="hidden" value="comments"/>
                        <label htmlFor="comments" class="label-checked:bg-gray-300 p-2 font-semibold mt-1 tracking-widest cursor-pointer">COMMENTS</label>
                    </div>         

                </div>

                <div className='flex justify-center'>
                    <div className="flex gap-x-10 mt-2">
                            <div className="flex-none w-[525px] h-[700px] px-5 max-h-[575px] overflow-y-scroll">
                                
                                {this.state.posts.length === 0 ? 

                                <div className="text-center mx-4 mt-2 font-light text-lg">
                                    User has not posted yet
                                </div>
                                : null}
                        
                                {this.state.posts.map(post => (
                                    <div className="mt-2"
                                    key={post._id}>
                                        <div className="border-[1px]">
                                            <div className="pl-[16px] pr-[16px] mt-2">
                                                {post.desc}
                                            </div>

                                            <hr className="mt-3"/>
                                            <div className="ml-3 my-2">
                                                <div className="font-semibold mb-2">
                                                    {post.likes.length} likes
                                                </div>

                                                <div className='flex gap-x-2'>
                                                    <div className="flex-none">
                                                        <button className="text-white bg-red-300 rounded-sm px-3"
                                                        onClick={() => this.handleLike(post._id)}>
                                                            ❤️
                                                        </button> 
                                                    </div>
                                                    
                                                    {this.props.userData.username === this.state.user.username && post._id !== undefined ?
                                                    <button className="text-white bg-red-500 rounded-sm px-3 mb-2"
                                                    onClick={() => this.handleDelete(post._id)}>
                                                        🗑️
                                                    </button> : null}

                                                </div>

                                                <div className="text-gray-500 text-sm mb-2">
                                                    {post.createdAt}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))} 

                            </div>

                            {this.props.userData.username === this.state.user.username ?
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
                                        <button type="submit" className="bg-blue-500 text-white px-2 rounded-sm mb-2">
                                            Post
                                        </button>
                                    </div>
                                </form> : null }
                                </div>
                            </div> : null }
                        </div> 
                </div> 
            </div>
        )
    }
}


export default withRouter(Profile)