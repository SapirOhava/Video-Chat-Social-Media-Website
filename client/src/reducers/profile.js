import {
  GET_FRIENDS,
  GET_PROFILE,
  GET_CONVERSATION_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_FOLLOWER,
  GET_PROFILES,
  FOLLOWER_ERROR,
  GET_SEARCH_PROFILES

} from '../actions/types';

const initialState = {
  profile: null,
  friends: [], // followers&followings
  conversationProfile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_FRIENDS:
      return {
        ...state,
        friends: payload,
        loading: false
      };

    case GET_CONVERSATION_PROFILE:
      return {
        ...state,
        conversationProfile: payload,
        loading: false
      };

    case GET_SEARCH_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };

    case UPDATE_FOLLOWER:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === payload.id ? { ...profile, followers: payload.followers } : profile
        ),
        loading: false
      };

    case FOLLOWER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }

}