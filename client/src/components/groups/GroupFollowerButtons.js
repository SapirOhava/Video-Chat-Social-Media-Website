import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeGroupFollower,addGroupFollower} from '../../actions/group';

export const GroupFollowerButtons = ({auth ,removeGroupFollower,addGroupFollower
    , group:{ followers , _id}}) => {
    
    useEffect(() => {

    }, [followers])
    return (
        <div >
            {(followers.filter((follower)=>follower===auth.user._id)).length>0 ? 
            (<button className='btn btn-primary' onClick={e=>removeGroupFollower(_id)}>Unfollow</button>) : (<button className='btn btn-primary' onClick={e=>addGroupFollower(_id)}>Follow</button>)}
        </div> 
    )
}
GroupFollowerButtons.propTypes = {
  
    auth:PropTypes.object.isRequired,
    removeGroupFollower:PropTypes.func.isRequired,
    addGroupFollower:PropTypes.func.isRequired,
    
}
const mapStateToProps = state => ({
    auth:state.auth,
    

});

export default connect(mapStateToProps,{removeGroupFollower,addGroupFollower})(GroupFollowerButtons);