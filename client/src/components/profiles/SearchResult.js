import React, { Fragment ,useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { FaUsers } from "react-icons/fa";

const SearchResult = ({  profile: { profiles, loading } ,auth }) => {
    
    


    return(
    <Fragment>{loading ? <Spinner /> :
        <Fragment>
            <h1 className="sapir">Pal's</h1>
            <p className="lead">
            <FaUsers/>
            
            Browse and connect with our Pal's

            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (auth.user._id !==profile.user._id ? (<ProfileItem  key={profile._id} profile={profile}/>):null
                    ))
                ) : <h4>No profiles found</h4>}
            </div>
        </Fragment>}
    </Fragment>);

}

SearchResult.propTypes = {
    
    profile: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {  })(SearchResult);
