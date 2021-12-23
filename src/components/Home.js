import React from 'react';
import profilePicture from './profilepicture.jpg';
import Navbar from './Navbar';

export default class Home extends React.Component {
    
    componentDidMount() {
        document.body.style.backgroundColor = "#f8f8ff";
    }
    
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                

                <div className="flex justify-center gap-x-10 mx-[365px] mt-3">
                    
                    <div className="flex-none border-[1px] w-[613.75px] py-[14px]">
                        <div className="pl-[16px] pr-[16px]">   
                            <div className="flex mb-3">
                                <div className="flex-none w-[35px]">
                                    <img className="rounded-full" alt="Profile" src={profilePicture} />
                                </div>
                            <div className="pl-3 pt-1 font-semibold">
                                    {this.props.username}
                                </div> 
                            </div>

                            <hr className="mb-2"/>

                            <div className="pl-[16px] pr-[16px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula euLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu
                            </div>

                            <hr className="mt-3 mb-2"/>

                            <div className="font-semibold my-2">
                                10 Likes
                            </div>

                            <div className="flex gap-x-2 my-2">
                                <div className="flex-none">
                                    <button className="text-white bg-red-400 rounded-sm px-3">
                                        Like
                                    </button>
                                </div>
                                <div className="flex-none">
                                    <button className="text-white bg-blue-400 rounded-sm px-3">
                                        Comment
                                    </button>
                                </div>
                            </div>

                            <div className="text-gray-500 text-sm mb-2">
                                December 19, 2021
                            </div>

                        </div>
                    
                        <hr className="mb-3"/>
                        
                        <div className="flex pl-[16px] pr-[16px]">
                            <div className="flex-none">
                                <input className="bg-[#f8f8ff] outline-0 w-[540px]" placeholder="Add a comment..." />
                            </div>

                            <div className="flex-none">
                                <button className="text-blue-500">Post</button>
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex-none w-[295px] my-7">

                        <div className="mb-6">
                            <button className="bg-blue-500 w-full p-2 text-white rounded-sm">
                                + Create a Post
                            </button>
                        </div>

                        <div className="flex">
                            <div className="flex-none w-[75px]">
                                <img className="border-[1px] rounded-full" alt="Profile" src={profilePicture} />
                            </div>
                            <div className="flex-none">
                                <div className="pt-4 pl-4">
                                    {this.props.username}
                                </div>
                                <div className="text-gray-400 text-sm pt-0 pl-4">
                                    {this.props.email}
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