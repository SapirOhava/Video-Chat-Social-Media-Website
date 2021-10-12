import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGroups } from '../../actions/group';
import GroupItem from './GroupItem';

const Groups = ({ getGroups, group: { groups , loading } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return loading ? <Spinner/> : (<Fragment>
      <h1 className="sapir">All Groups</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
      </p>
      <div className="profiles">
          {groups.map(group=>(
              <GroupItem key={group._id} group={group} /> 
          ))}
      </div>
  </Fragment>);
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(Groups);