import React from 'react';
import profilePicture from './profilepicture.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom'

const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const userID = localStorage.getItem('userID');
const token = localStorage.getItem('token');

export default class Home extends React.Component {
    
    state = {
        posts: [],
        users: [],
        createPost: false,
        text: "",
        comment: "",
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#f8f8ff";

        const userURL = `https://hosted-api-website.herokuapp.com/api/users`;
        axios.get(userURL, { headers: { 'Authorization': `Bearer ${token}`} })
            .then(response => {
                this.setState({ 
                    users: response.data,
                })
            })
        
        const postURL = `https://hosted-api-website.herokuapp.com/api/posts`;
        axios.get(postURL)
            .then(response => {
                this.setState({ 
                    posts: response.data.reverse(),
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
        event.preventDefault();
        const post = JSON.stringify({
            text: this.state.text,
            postedBy: userID
        })

        const postParsed = {
            text: this.state.text,
            postedBy: userID,
            likes: [],
            comment: [],
        }

        const URL = `https://hosted-api-website.herokuapp.com/api/posts`;
        axios.post(URL, post, {
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            this.setState(prevState => ({
                posts: [postParsed, ...prevState.posts]
            }))
            }
        )
        this.setState({ text: "" })
    }

    handleDelete = (id) => {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;
        axios.delete(URL);
        }

    handleLike = (id) => {
        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;
        axios.patch(URL, { likes: userID });
        }

    handleDislike = (id, userId) => {
        
        let newLikes = [];

        const URL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;
        axios.get(URL)
            .then(response => {
                newLikes = response.data.likes;

                let index = newLikes.indexOf(userId);
                newLikes.splice(index, 1);

                axios.patch(URL, { likes: userId })
                        window.location.reload(false);
                })
            }

    handleComment = (id) => {

        const comment = JSON.stringify({
            text: this.state.comment,
            commentBy: userID,
            post: id
        }) 
    
        const commentsURL = `https://hosted-api-website.herokuapp.com/api/posts/${id}/comments`;
        const postURL = `https://hosted-api-website.herokuapp.com/api/posts/${id}`;

        axios.post(commentsURL, comment, {
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(response => {
            axios.patch(postURL, { comments: response.data._id })
        })
    }

    render() {
        return (
            <div>
                <div className="flex justify-center gap-x-10 mx-[365px] mt-3">
                    
                    {(this.state.posts.length !== 0) ? 
                    <div className="flex-none mt-7">
                        {this.state.posts.map(post => (
                            <div className="border-[1px] w-[613.75px] py-[14px] pl-[16px] pr-[16px] mb-3"
                            key={post._id}>   
                                <div className="flex mb-3">
                                    <div className="flex-none w-[35px]">
                                        <img className="rounded-full" alt="Profile" src={profilePicture} />
                                    </div>
                                    
                                    <div className="flex-none pl-3 pt-1 font-semibold">
                                        {post.postedBy.username}
                                    </div> 
                    
                                </div>

                                <hr className="mb-2"/>

                                <div className="pl-[16px] pr-[16px]">
                                    {post.text}
                                </div>

                                <hr className="mt-3 mb-2"/>

                                <div className="font-semibold my-2">
                                    {post.likes.length} likes, {post.comments.length} comments
                                </div>

                                <div className="flex gap-x-2 my-2">
                                    <div className="flex-none">
                                        { post.likes.includes(userID) ?
                                            <button className="text-white bg-red-600 rounded-sm px-3">
                                                Like
                                            </button> : <button className="text-white bg-red-400 rounded-sm px-3"
                                             onClick={() => this.handleLike(post._id)}>
                                                 Like
                                             </button>}
                                    </div>
                                    <div className="flex-none">
                                        {this.state.commentClicked ? 
                                        <button className="text-white bg-blue-500 rounded-sm px-3"
                                        onClick={() => this.setState({ commentClicked: !this.state.commentClicked })}>
                                            Comment
                                        </button> :
                                        <button className="text-white bg-blue-400 rounded-sm px-3"
                                        onClick={() => this.setState({ commentClicked: !this.state.commentClicked })}>
                                            Comment
                                        </button> }
                                    </div>
                                    {post.postedBy._id === userID ? <div className="flex-none">
                                        <button className="text-white bg-red-500 rounded-sm px-3"
                                        onClick={() => this.handleDelete(post._id)}>
                                            Delete
                                        </button>
                                    </div> : null}
                                </div>

                                <div className="text-gray-500 text-sm mb-2">
                                    {post.date}
                                </div>
                            
                                {this.state.commentClicked ? 
                                    <div>
                                    <hr className="mb-3"/>
                                    {post.comments.map(comment => (
                                        <div key={comment._id}>
                                            <div className="flex">
                                                <div className="flex-none">
                                                    <img src={profilePicture} className="rounded-full w-[35px]"/>
                                                </div>

                                                <div className="flex-none pl-3 pt-1 font-semibold">
                                                    {this.state.users.map(user => (
                                                        user._id === comment.commentBy ? 
                                                            <div key={user._id} className="flex gap-x-2">
                                                                <div>
                                                                    {user.username}
                                                                </div>
                                                                
                                                                <div className="text-sm font-normal text-gray-500 mt-[3px]">
                                                                    {comment.date}   
                                                                </div>
                                                                
                                                            </div> : null
                                                    ))}
                                                </div>                                          
                                            </div>

                                            <div className="ml-[47.5px]">
                                                {comment.text}
                                            </div>

                                            <hr className="my-3"/>
                                    
                                        </div>
                                    
                                    ))}

                                    <div className="flex pl-[16px] pr-[16px]">
                                        <div className="flex-none">
                                            <input className="bg-[#f8f8ff] outline-0 w-[540px]" 
                                            placeholder="Add a comment..." 
                                            values={this.state.comment}
                                            onChange={this.handleChange}
                                            name="comment"/>
                                        </div>

                                        <div className="flex-none">
                                            <button className="text-blue-500"
                                            onClick={() => this.handleComment(post._id)}>
                                                Post
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                 : null }
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
                                    <div className='text-center'>
                                        <textarea className="px-2 mt-4 h-32 w-64 outline-0 rounded-sm resize-none"
                                        placeholder="What's on your mind?" 
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.handleChange}/>
                                    </div>
                                    
                                    <div className='px-5'>
                                        <button className="bg-blue-500 text-white px-2 rounded-sm mb-2">
                                            Post
                                        </button>
                                    </div>
                                </form> : null }

                        </div>

                        <div className="flex">
                            <div className="flex-none w-[75px]">
                                <button>
                                    <Link to='/profile'>
                                        <img className="border-[1px] rounded-full" alt="Profile" src={profilePicture} />
                                    </Link>
                                </button>
                            </div>
                            <div className="flex-none">
                                <div className="pt-4 pl-4">
                                    <Link to='/profile'>
                                        {username}
                                    </Link>
                                </div>
                                <div className="text-gray-400 text-sm pt-0 pl-4">
                                    <Link to='/profile'>
                                        {email}
                                    </Link>
                                </div>
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