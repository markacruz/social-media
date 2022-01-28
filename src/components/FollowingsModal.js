import React, { Component } from 'react';
import profilePicture from './profilepicture.jpg'
import { Link } from 'react-router-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    borderRadius: '10px',
    zIndex: 1000
}
  
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default class FollowingsModal extends Component {
  render() {
    return (
    <div>
        <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <div className='w-[400px] h-[400px]'>
                    
                    <div className='flex items-center py-2 border-b-[1px]'>
                        
                        <div className='w-[48px]' />
                        

                        <div className='text-center text-lg font-semibold w-full'>   
                            Following
                        </div>

                        <div className='w-[48px]'>
                            <button onClick={this.props.close}
                            className=''>
                                ❌
                            </button>
                        </div>
                        
                    </div>

                    <div className='max-h-[355px] overflow-y-scroll h-[355px] pt-2'>
                        {this.props.followings.map(following => (
                            <div className='flex items-center gap-x-2 mb-2 ml-3'
                            key={following.username}>
                                <div>
                                    <Link to={`/profile/${following.username}`}>
                                        <img src={profilePicture}
                                        className='w-[50px] rounded-full' />
                                    </Link>
                                </div>

                                <div className='font-semibold'>
                                    <Link to={`/profile/${following.username}`}>
                                        {following.username}
                                    </Link>                                  
                                </div>
                            </div>
                        ))}
                    </div>
                    

                </div>
            </div>
    </div>
    )
  }
}
