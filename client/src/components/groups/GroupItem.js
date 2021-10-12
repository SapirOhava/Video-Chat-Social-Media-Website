import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { deleteGroup } from '../../actions/group';
import GroupFollowerButton from './GroupFollowerButtons';
import { FaRegTrashAlt } from "react-icons/fa";

const GroupItem = ({auth,group,group:{name , _id , about , owner},deleteGroup}) => {
   
    return (

        <div className="profile bg-light">
        <div>
            <h2>{name}</h2>
            <p className='my'>About : {about && <span>{about}</span>}</p>

            <Link to={`/group/${_id}`} className='btn btn-primary'>
                view group
            </Link>
            <GroupFollowerButton group={group}/>
            {!auth.loading && owner.toString() === auth.user._id && (
                <button 
                onClick={(e) => deleteGroup(_id)}  
                type="button"
                className="btn btn-danger"
              >
            <FaRegTrashAlt/>
              Delete</button>
            )}

        </div>
    </div>
    )
}

GroupItem.propTypes = {
    group:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    deleteGroup:PropTypes.func.isRequired

}
const mapStateToProps = state => ({
    auth:state.auth

});
export default connect(mapStateToProps,{deleteGroup})(GroupItem)
