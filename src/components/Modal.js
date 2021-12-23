import React from 'react';

export default class Modal extends React.Component {
    render() {
        return (
            <div className="mx-[600px] my-10 bg-gray-200 border-[1px] border-gray-300 ">
                <div className="justify-center items-center border-[1px] rounded-md py-8 px-10">
                    
                    <div className="text-4xl">
                        Edit Profile
                    </div>

                    <form>
                        <div className="flex ml-14 text-xl gap-x-10 mt-5 mb-5">
                            <div className="flex-none  mt-3">
                                Change Username
                            </div>
                            <div className="flex-none rounded-sm">
                                <input className="p-3 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400" placeholder="Enter new username"/>
                            </div>
                        </div>

                        <hr />

                        <div className="flex ml-14 text-xl gap-x-10 mt-5 mb-5">
                            <div className="flex-none mt-3">
                                Change Email
                            </div>
                            <div className="flex-none rounded-sm">
                                <input className="p-3 w-42 bg-inherit outline-0 border-b-[1px] border-gray-400" placeholder="Enter new email address"/>
                            </div>
                        </div>

                        <hr />

                        <div className="text-xl text-center mt-7">
                            <button className="text-white bg-green-400 p-3 rounded-sm">
                                Change Password
                            </button>
                        </div>

                        <div className="text-xl text-center mt-4">
                            <button className="text-white bg-blue-400 p-2 rounded-sm"
                            type="submit">
                                Submit
                            </button>
                        </div>
                    </form>

                    


                </div>
            </div>
        )
    }
}