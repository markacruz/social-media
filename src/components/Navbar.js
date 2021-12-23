import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return ( 
            <div className="border-[1px] sticky">
                <navbar>

                    <div className="flex mx-[500px] my-2 gap-x-4">

                        <div className="flex-none">
                            <button className="text-lg"
                            onClick={<Redirect to='/home' />}>
                                Home
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg"
                            onClick={<Redirect to='/home' />}>
                                Profile
                            </button>
                        </div>

                        <div className="flex-none">
                            <button className="text-lg"
                            onClick={<Redirect to='/home' />}>
                                Sign Out
                            </button>
                        </div>

                        <div className="flex-none w-fit content-end">
                            <input className="bg-gray-200 outline-0 px-2 border-gray-300 border-[1px] " placeholder="Search..."></input>
                        </div>
                    </div>
                    
                </navbar>
                
            </div>
        )
    }
}