import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GROUPS,
  GROUP_ERROR,
  GET_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  DELETE_GROUP,
  UPDATE_GROUP_FOLLOWER,
  GROUP_FOLLOWER_ERROR


} from './types';

// Get all groups of the user
export const getMyGroups = () => async dispatch => {
       
   try {
       
       const res = await axios.get('/api/groups/myGroup');
       
   dispatch({
     type: GET_GROUPS,
     payload: res.data
   });
 } catch (err) {
   
   dispatch({
     type: GROUP_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status }
   });
 }
};



// Get all groups
export const getGroups = () => async dispatch => {
       
  try {
      const res = await axios.get('/api/groups');
  dispatch({
    type: GET_GROUPS,
    payload: res.data
  });
} catch (err) {
  
  dispatch({
    type: GROUP_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status }
  });
}
};


// Get a groups by a given id 
export const getGroupById = (groupId) => async dispatch => {
       
    try {
        
        const res = await axios.get(`/api/groups/${groupId}`);
        
    dispatch({
      type: GET_GROUP,
      payload: res.data
    });
  } catch (err) {
    
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
 };

 
// create new group
export const newGroup = ({name,subject,about}) => async dispatch => {
  const config = {
      headers:{
          'Content-Type':'application/json'
      }
  }
  const body = JSON.stringify({name,subject,about});
  try{
      const res =  await axios.post('/api/groups',body,config);
      dispatch({
          type: CREATE_GROUP_SUCCESS,
          payload: res.data // its the new group 
      });
      dispatch(setAlert('group created', 'success')); 
  }
  catch(err){
      const errors = err.response.data.errors;
      if(errors){
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));  
      }

      dispatch({
          type: CREATE_GROUP_FAIL
      });

  }
}

// Delete group
export const deleteGroup = id => async dispatch => {
  try {
    await axios.delete(`/api/groups/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id
    });

    dispatch(setAlert('Group Removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//addGroupFollower
export const addGroupFollower = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/addFollowingGroup/${id}`);

    dispatch({
      type: UPDATE_GROUP_FOLLOWER,
      payload: { id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: GROUP_FOLLOWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// removeGroupFollower
export const removeGroupFollower = id => async dispatch => {
  try {
    const res = await axios.put(`/api/profile/removeFollowingGroup/${id}`);

    dispatch({
      type: UPDATE_GROUP_FOLLOWER,
      payload: {id, followers: res.data }
    });
  } catch (err) {
    dispatch({
      type: GROUP_FOLLOWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


