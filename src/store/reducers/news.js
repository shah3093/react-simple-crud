import * as actionTypes from '../../constants/action_types';
import {
  updateObject
} from '../../utilities/updateObject';

const initialState = {
  articles: null,
  totalResults: null,
  error: null,
  loading: false
};

const gettingNews = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const showingNews = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    totalResults:action.totalResults,
    articles:action.articles,
  });
}


const showingError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_NEWS:
      return gettingNews(state, action);
    case actionTypes.SHOWING_NEWS:
      return showingNews(state, action);
    case actionTypes.SHOWING_ERROR:
      return showingError(state, action);
    default:
      return state;
  }
}

export default reducer;
