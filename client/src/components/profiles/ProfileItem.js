import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FollowersButtons from '../profile/FollowersButtons';
import avatar from "../../img/avatar.jpg";

const ProfileItem = ({profile, profile: {user: { _id, name},photo, Academic_degree,about} }) => {
    return (
        <div className="profile bg-light">
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
            <div>
                <h2>{name}</h2>
                <p className='my'>Academic degree : {Academic_degree && <span>{Academic_degree}</span>}</p>
                <p className='my'>About : {about && <span>{about}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
                
                    <FollowersButtons  profile={profile}/>
                
                
               
            </div>
        </div>
    )
}


ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(ProfileItem);