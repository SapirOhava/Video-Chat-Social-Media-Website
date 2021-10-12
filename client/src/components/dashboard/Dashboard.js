import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import { Link } from 'react-router-dom';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';

const Dashboard = ({ 
    getCurrentProfile,
    deleteAccount,
    profile: { profile, loading } }) => {
    
        useEffect(() => {
        getCurrentProfile();
        
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : 
    <Fragment>
        
        {profile !== null ?(
        <Fragment>
            <DashboardActions/>
            <div className="profile-grid my-1">
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
                </button>
            </div>
        </Fragment>
        ):(
        <Fragment>
            <p>You have not yet setup a profile,please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
            <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
            </button>
        </Fragment>
        )}

    </Fragment>;

}


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
