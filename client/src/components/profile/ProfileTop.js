import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import avatar from "../../img/avatar.jpg";

const ProfileTop = ({profile:{
    user:{name}, 
    photo,
    location,  
    Academic_degree,
    Academic_Institution,
    following,
    followers,
    followingGroups
    
}}) => {
    return (
        <div className="profile-top  p-2 "  >
            {photo ? (
                     <img
                     className="round-img my-1"
                     src={`/uploads/${photo}`}
                     alt="..."
                 />) : (<img
                    className="round-img my-1"
                    src={avatar}
                    alt="..."
                />)
            }
             
          
            <h1 className="large">{name}</h1>
            <p className="lead">{Academic_degree} , {Academic_Institution} ,{location}</p>
            <div className="icons my-1">
            <Link to={`/myNotebook`} >{name}'s files</Link>
               <Link to={`/followers`} >  followers  {followers.length}</Link>
               <Link to={`/followings`} >  following  {following.length}</Link> 
               <Link to={`/myGroups`} >  my groups  {followingGroups.length}</Link>  
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop
