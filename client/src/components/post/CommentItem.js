import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';
import { FaRegTrashAlt } from "react-icons/fa";
import avatar from "../../img/avatar.jpg";

const CommentItem = ({
  postId,
  comment: { _id, text, name, photo, user, date },
  auth,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
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
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
        <FaRegTrashAlt/>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);