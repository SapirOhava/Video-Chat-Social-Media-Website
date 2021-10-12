import {
    GET_GROUP,
    GET_GROUPS,
    GROUP_ERROR,
    CREATE_GROUP_FAIL,
    CREATE_GROUP_SUCCESS,
    DELETE_GROUP,
    UPDATE_GROUP_FOLLOWER,
    GROUP_FOLLOWER_ERROR

  } from '../actions/types';
  
  const initialState = {
    groups: [],
    group: null,
    loading: true,
    error: {}
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_GROUPS:
        return {
          ...state,
          groups: payload,
          loading: false
        };
      case GET_GROUP:
        return {
          ...state,
          group: payload,
          loading: false
        };
  
      case CREATE_GROUP_SUCCESS:
        return {
          ...state,
          groups: [payload, ...state.groups],
          loading: false
        };
      case DELETE_GROUP:
        return {
          ...state,
          groups: state.groups.filter((group) => group._id !== payload),
          loading: false
        };
      case GROUP_ERROR:
      case CREATE_GROUP_FAIL:
        return {
          ...state,
          error: payload,
          loading: false
        };
        case UPDATE_GROUP_FOLLOWER:
          return { 
            ...state,
            groups: state.groups.map((group) =>
            group._id === payload.id ? { ...group, followers: payload.followers } : group
            ),
            loading: false
          };
          case GROUP_FOLLOWER_ERROR:
            return {
              ...state,
              error: payload,
              loading: false
            };
      default:
        return state;
    }
  }