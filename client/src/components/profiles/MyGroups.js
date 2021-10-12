import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GroupItem from '../groups/GroupItem';
import { getGroups } from '../../actions/group';

const MyGroups = ({ getGroups, profile: { profile, loading }
    ,group: { groups } ,grouploading,auth }) => {

    useEffect(() => {
        
        getGroups();
    }, []);

    return(
    <Fragment>{loading || grouploading ? <Spinner /> :
        <Fragment>
            <h1 className="sapir">groups i follow</h1>
            
            <div className="profiles">
                {groups.length > 0 ? (
                    groups.map(group => (profile.followingGroups.includes(group._id) ? (<GroupItem  key={group._id} group={group}/>):null
                    ))
                ) : <h4>No profiles found</h4>}
            </div>
        </Fragment>}
    </Fragment>);

}

MyGroups.propTypes = {
    
    getGroups: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    group:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    grouploading:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    group:state.group,
    grouploading:state.group.loading,
    auth: state.auth
});

export default connect(mapStateToProps, {  getGroups })(MyGroups);