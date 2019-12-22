import * as actionTypes from '../../constants/action_types';
import {
  updateObject
} from '../../utilities/updateObject';

const initialState = {
  quotes: null,
  error: null,
  loading: false
};

const gettingQuotes = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const showingQuotes = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    quotes:action.quotes,
  });
}


const showingError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_QUOTES:
      return gettingQuotes(state, action);
    case actionTypes.SHOWING_QUOTES:
      return showingQuotes(state, action);
    case actionTypes.SHOWING_ERROR:
      return showingError(state, action);
    default:
      return state;
  }
}

export default reducer;
