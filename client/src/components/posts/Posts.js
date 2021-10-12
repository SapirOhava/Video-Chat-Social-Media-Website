import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';


const Posts = ({ groupId,getPosts, post: { posts,loading},owner }) => {
  useEffect(() => {
    getPosts(groupId);
  }, [getPosts,groupId]);

  return loading ? <Spinner/> : (
    <Fragment>
      <PostForm groupId={groupId}/>
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} owner={owner} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);