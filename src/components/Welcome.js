import React from 'react';
import { Link } from 'react-router-dom';
import social from '../social.png';


export default class Welcome extends React.Component {
    
    componentWillMount() {
        document.body.style.backgroundColor = "#f8f8ff";
    }

    render() {
        return (
            <div className="grid place-items-center h-screen">
                <div>
                    <div className="flex text-center text-white items-center gap-x-8">
                        <div>
                            <div className="text-9xl text-black">
                                Welcome!
                            </div>
                            <div className="text-xl italic text-gray-400">
                                Get socializing, Everyone is waiting for you!
                            </div>
                        </div>
                        
                        <div>
                            <button className="bg-blue-500 text-lg text-white px-2 py-1 rounded-sm border-[1px] border-gray-400 animate-bounce">
                                <Link to="/login">
                                    Get started! →
                                </Link>
                            </button>
                        </div>
                    </div>

                    
                </div>
                    <img src={social} />
            </div>
        )
    }        
}
