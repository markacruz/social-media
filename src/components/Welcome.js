import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import configParticles from '../config/configParticles';

export default class Welcome extends React.Component {
    
    componentDidMount() {
        document.body.style.backgroundColor = "#848484"
    }
    
    render() {
        return (
            <div className="grid place-items-center h-screen">
                <div style={{ position: 'absolute'}}>
                    <Particles height="100vh" width="100vw" params={configParticles} />
                </div>

                <div style={{ position: 'relative', overflow: "hidden" }}>
                    <div className="text-center text-white">
                        <div className="text-9xl">
                            Welcome!
                        </div>
                        <div className="text-xl mb-5">
                            Get socializing, Everyone is waiting for you!
                        </div>
                        
                        <button className="bg-blue-500 text-lg text-white px-2 py-1 rounded-sm border-[1px]">
                            <Link to="/login">
                                Get started!
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }        
}
