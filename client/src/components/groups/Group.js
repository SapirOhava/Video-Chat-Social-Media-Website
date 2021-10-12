import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGroupById } from '../../actions/group';
import Posts from '../posts/Posts';
import GroupFollowerButtons from '../groups/GroupFollowerButtons';
import { Link } from 'react-router-dom';

const Group = ({ getGroupById, group: { group, loading }, match }) => {
    useEffect(() => {
        getGroupById(match.params.id)
    }, [getGroupById, group])

    return (
        <Fragment>
            {group === null || loading ? <Spinner /> :
                <Fragment>

                    <GroupFollowerButtons group={group} />
                    <Link to="/myNotebookGroup" className="btn btn-light">
                        <i className="fas fa-user-circle text-primary"></i> {group.name}'s files</Link>


                    <div className="a">
                        <h2>{group.name}</h2>
                        <p>{group.about}</p>
                    </div>

                    <Posts groupId={match.params.id} owner={group.owner} />

                </Fragment>}
        </Fragment>
    )
}

Group.propTypes = {
    getGroupById: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    group: state.group

});

export default connect(mapStateToProps, { getGroupById })(Group)
