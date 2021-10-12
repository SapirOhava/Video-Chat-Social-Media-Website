import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMyGroups } from '../../actions/group';
import GroupItem from './GroupItem';

const Groups = ({ getMyGroups, group: { groups , loading } }) => {
  useEffect(() => {
    getMyGroups();
  }, [getMyGroups]);

  return loading ? <Spinner/> : (<Fragment>
      <h1 className="sapir">My Groups</h1>
      <p className="lead">
        <i className="material-icons"></i>
      </p>
      <div className="profiles">
          {groups.map(group=>(
              <GroupItem key={group._id} group={group} /> 
          ))}
      </div>
  </Fragment>);
};

Groups.propTypes = {
  getMyGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  group: state.group
});

export default connect(mapStateToProps, { getMyGroups })(Groups);