import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';
import FollowersButtons from './FollowersButtons';

const Profile =({ getProfileById,profile:{ profile,loading}, match }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    },[profile,getProfileById,match.params.id])
    return (
        <Fragment>
            {profile === null  || loading ? <Spinner/> : <Fragment>
                <div>
                <FollowersButtons  profile={profile}/>
                </div>
                <div className="profile-grid my-1">
                    
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                </div>
                </Fragment>} 
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
    
}

const mapStateToProps = state => ({
    profile: state.profile
    
});

export default connect(mapStateToProps,{getProfileById})(Profile)
