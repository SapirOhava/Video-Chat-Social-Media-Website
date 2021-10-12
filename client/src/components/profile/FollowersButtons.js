import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeFollower,addFollower} from '../../actions/profile';

export const FollowersButtons = ({auth ,removeFollower,addFollower, profile:{following , followers , _id}}) => {
    
    useEffect(() => {

    }, [followers,following])
    return (
        <div >
            {(followers.filter((follower)=>follower===auth.user._id)).length>0 ? 
            (<button className='btn btn-primary' onClick={e=>removeFollower(_id)}>Unfollow</button>) : (<button className='btn btn-primary' onClick={e=>addFollower(_id)}>Follow</button>)}
        </div> 
    )
}
FollowersButtons.propTypes = {
  
    auth:PropTypes.object.isRequired,
    removeFollower:PropTypes.func.isRequired,
    addFollower:PropTypes.func.isRequired,
    
}
const mapStateToProps = state => ({
    auth:state.auth,
    

});

export default connect(mapStateToProps,{removeFollower,addFollower})(FollowersButtons);