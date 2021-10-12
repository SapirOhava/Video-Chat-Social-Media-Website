import axios from 'axios';
import { setAlert } from './alert';


import {
  GET_FRIENDS,
  GET_PROFILE,
  GET_CONVERSATION_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  UPDATE_FOLLOWER,
  FOLLOWER_ERROR,
  GET_SEARCH_PROFILES

} from './types';



//get friends of the user
export const getFriends = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    const myProfile = res.data;
    let friends = [];
    for (let i = 0; i < myProfile.followers.length; i++) {
      const followerProfile = await axios.get(`/api/profile/user/${myProfile.followers[i]}`);
      friends.push(followerProfile.data);
    }
    for (let i = 0; i < myProfile.following.length; i++) {
      const followingProfile = await axios.get(`/api/profile/user/${myProfile.following[i]}`);
      friends.push(followingProfile.data);
    }

    dispatch({
      type: GET_FRIENDS,
      payload: friends
    });
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



// searchProfiles
export const searchProfiles = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }
   
    const res = await axios.post('/api/profile/search' , formData , config);
    

    dispatch({
      type: GET_SEARCH_PROFILES,
      payload: res.data
    });

    history.push('/searchResult');
  } catch (err) {
      const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));  
        }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
  }
}



// getCurrentProfile
export const getCurrentProfile = () => async dispatch => {
    try {
      const res = await axios.get('/api/profile/me');
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }
    const res = await axios.post('/api/profile' , formData , config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created','success'));
    history.push('/dashboard');
    
  } catch (err) {
      const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));  
        }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    
  }
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get Conversation profile by ID
export const getConversationProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_CONVERSATION_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

//addFollower
export const addFollower = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/addFollower/${id}`);

    dispatch({
      type: UPDATE_FOLLOWER,
      payload: { id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: FOLLOWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// removeFollower
// removeFollower/:id
export const removeFollower = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/removeFollower/${id}`);

    dispatch({
      type: UPDATE_FOLLOWER,
      payload: {id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: FOLLOWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



