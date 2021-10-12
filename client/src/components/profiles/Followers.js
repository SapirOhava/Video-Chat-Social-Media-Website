import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Followers = ({ getProfiles, profile: { profiles, loading,profile } }) => {

    
    useEffect(() => {
        getProfiles();
    }, []);
   
    
    return(
    <Fragment>{loading ? <Spinner /> :
        <Fragment>
            <h1 className="sapir">followers</h1>
            
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(p => (profile.followers.includes(p.user._id) ? (<ProfileItem  key={p._id} profile={p}/>):null
                    ))
                ) : <h4>No profiles found</h4>}
            </div>
        </Fragment>}
    </Fragment>);

}

Followers.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Followers);
