import React from 'react';
import profilePicture from './profilepicture.jpg';
import options from '../options.png';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default class Home extends React.Component {
    
    state = {
        posts: [],
        users: [],
        createPost: false,
        text: "",
        comment: "",
        suggestedUsers: [],
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#f8f8ff";

        const timelinePostsURL = `https://hosted-api-website.herokuapp.com/api/posts/timeline/${this.props.userData._id}`;
        axios.get(timelinePostsURL)
        .then(response => {
            this.setState({ 
                posts: response.data.reverse(),
            })
        });

        axios.get(`https://hosted-api-website.herokuapp.com/api/users/${this.props.userData._id}/suggested`)
        .then(response => {
            this.setState({
                suggestedUsers: response.data
            }) 
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreatePost = () => {
        this.setState({
            createPost: !this.state.createPost
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

        const URL = `https://hosted-api-website.herokuapp.com/api/posts`;
        axios.post(URL, reqPost, {
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response)
            this.setState(prevState => ({
                posts: [post ,...prevState.posts]
            }))
        })
        this.setState({ text: "" })
    }

    handleDelete = (id) => {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;
        axios.delete(URL, { data: {userId: this.props.userData._id }})
        .then(response => { 
            console.log(response)
        })

        this.setState({
            posts: this.state.posts.filter(post => post._id !== id)
        })
    }

    handleLike = (id) => {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}/like`;
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

    handleFollow = (userId) => {
        const followURL = `https://hosted-api-website.herokuapp.com/api/users/${userId}/follow`
        axios.put(followURL, {
            userId: this.props.userData._id
        })
        .then(response => {
            console.log(response)
            this.setState({
                suggestedUsers: this.state.suggestedUsers.filter(user => user._id !== userId)
            })
        }).catch(err => console.log(err))
    }

    // handleComment = (id) => {

    //     const comment = JSON.stringify({
    //         text: this.state.comment,
    //         commentBy: userID,
    //         post: id
    //     })
    
    //     const commentsURL = `https://hosted-api-website.herokuapp.com/api/posts/${id}/comments`;
    //     const postURL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;

    //     axios.post(commentsURL, comment, {
    //         headers: {
    //         'Content-Type': 'application/json',
    //         }
    //     })
    //     .then(response => {
    //         axios.patch(postURL, { comments: response.data._id })
    //         .then(response => window.location.reload(false))
    //     })
    // }

    render() {
        return (
            <div>
                <div className="flex justify-center gap-x-10 mx-[365px] mt-3">
                    
                    {(this.state.posts.length !== 0) ? 
                    <div className="flex-none mt-7 pr-4 max-h-[85vh] overflow-y-scroll">
                        {this.state.posts.map(post => (
                            <div className="border-[1px] w-[613.75px] py-[14px] mb-3"
                            key={post._id}>   
                                <div className="flex mb-3 items-center">
                                    <div className="flex-none pl-4">
                                        <Link to={`/profile/${post.userId.username}`}>
                                            <img className="rounded-full w-[40px] " alt="Profile" src={profilePicture} />
                                        </Link>
                                    </div>
                                    
                                    <div className="flex-none pl-3 font-semibold">  
                                        <Link to={`/profile/${post.userId.username}`}>
                                            {post.userId.username}
                                        </Link>
                                    </div>
                    
                                </div>

                                <hr className="mb-3"/>

                                <div className="px-[16px]">
                                    {post.desc}
                                </div>

                                <hr className="mt-3 mb-2"/>

                                <div className="font-semibold my-2 pl-4">
                                    {post.likes.length} likes
                                </div>

                                <div className="flex gap-x-2 my-2 pl-4">
                                    <div className="flex-none">
                                        {!post.likes.includes(this.props.userData._id) ?
                                        <button className="text-white bg-red-200 rounded-sm px-3"
                                        onClick={() => this.handleLike(post._id)}>
                                            ❤️
                                        </button> :
                                        <button className="text-white bg-red-500 rounded-sm px-3"
                                        onClick={() => this.handleLike(post._id)}>
                                            🤍
                                        </button>
                                        }
                                    </div>
    
                                    {post.userId._id === this.props.userData._id && post._id !== undefined ? <div className="flex-none">
                                        <button className="text-white bg-red-500 rounded-sm px-3"
                                        onClick={() => this.handleDelete(post._id)}>
                                            🗑️
                                        </button>
                                    </div> : null}
                                </div>

                                <div className="text-gray-500 text-sm mb-2 pl-4">
                                    {post.createdAt}
                                </div>
                            
                                    <div>
                                    <hr className="mb-3"/>
        
                                </div>
                            </div> 
                        ))} 
                        
                    </div>  : 
                    
                    <div className="flex-none mt-7">
                        <div className="border-[1px] w-[613.75px] py-[14px] pl-[16px] pr-[16px] mb-3 italic">
                        “It is beautiful, it is endless, it is full and yet seems empty. It hurts us.”
                        ― Jackson Pearce, Fathomless
                        </div>
                    </div>
                    }
                    
                    <div className="flex-none w-[295px] my-7">

                        <div className="mb-4">
                            <button className="bg-blue-500 w-full p-2 text-white rounded-sm"
                            onClick={this.handleCreatePost}>
                                + Create a Post
                            </button>

                            {this.state.createPost ? 
                                <form className="w-full bg-gray-200"
                                onSubmit={this.handleSubmit}>
                                    <div className='flex justify-center items-center mb-1'>
                                        <div className='mx-2'>
                                            <textarea className="px-2 mt-4 h-32 w-56 outline-0 rounded-sm resize-none"
                                            placeholder="What's on your mind?" 
                                            name="text"
                                            value={this.state.text}
                                            onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <button className='text-2xl bg-gray-400 rounded p-1'>
                                                📁
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className='px-4'>
                                        <button className="bg-blue-500 text-white w-full rounded-sm mb-2 p-2">
                                            Post
                                        </button>
                                    </div>
                                </form> 
                                
                                : null }

                        </div>

                        <div className="flex">
                            <div className="flex-none w-[75px]">
                                <button>
                                    <Link to={`/profile/${this.props.userData.username}`}>
                                        <img className="border-[1px] rounded-full" alt="Profile" src={profilePicture} />
                                    </Link>
                                </button>
                            </div>
                            <div className="flex-none">
                                <div className="pt-4 pl-4">
                                    <Link to={`/profile/${this.props.userData.username}`}>
                                        {this.props.userData.username}
                                    </Link>
                                </div>
                                <div className="text-gray-400 text-sm pt-0 pl-4">
                                    <Link to={`/profile/${this.props.userData.username}`}>
                                        {this.props.userData.email}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='mt-2 '>
                            <h1 className='text-gray-400 font-semibold'>
                                Suggestions For You
                            </h1>

                            <div className='mt-3 max-h-[400px] overflow-y-scroll'>
                                {this.state.suggestedUsers.map(user => (
                                    <div className='flex mb-2 gap-x-3 items-center'
                                    key={user._id}>
                                        <div className=''>
                                            <Link to={`/profile/${user.username}`}>
                                                <img src={profilePicture} 
                                                    className='w-[40px] rounded-full'
                                                    alt="Profile"/>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={`/profile/${user.username}`}>
                                                {user.username}
                                            </Link>
                                        </div>
                                        <div className='w-[70px]' />
                                        <div>
                                            <button className='text-blue-500 text-sm'
                                            onClick={() => this.handleFollow(user._id)}>
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>

                        <div className="text-gray-400 mt-4 text-sm text-center">
                            © 2021 Mark Angelo Cruz
                        </div>

                    </div>
                </div>
            
            </div>
        )
    }
}