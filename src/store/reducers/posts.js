import * as actionTypes from '../../constants/action_types';
import {
  updateObject
} from '../../utilities/updateObject';

const initialState = {
  posts: null,
  singlePost:null,
  error: null,
  loading: false
};

const gettingPost = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const showPosts = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    posts:action.posts,
  });
}

const showSinglePost = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    singlePost:action.singlePost,
  });
}

const createPost = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const editPost = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const deletePost = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}


const showingError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_POST:
      return createPost(state, action);
    case actionTypes.GETTING_POSTS:
      return gettingPost(state, action);
    case actionTypes.SHOW_POSTS:
      return showPosts(state, action);
    case actionTypes.SHOW_SINGLE_POSTS:
      return showSinglePost(state, action);
    case actionTypes.EDIT_POST:
      return editPost(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    case actionTypes.POST_ERROR:
      return showingError(state, action);
    default:
      return state;
  }
}

export default reducer;
