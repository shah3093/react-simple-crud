import * as actionTypes from '../../constants/action_types';
import * as projectConstant from '../../constants/projects';


export const gettingQuotes = () => {
  return {
    type: actionTypes.GETTING_QUOTES
  }
}


export const showingError = (error) => {
  return {
    type: actionTypes.SHOWING_ERROR,
    error: error
  }
}


export const showingQuoteSuccess = (responseData) => {
  
  return {
    type: actionTypes.SHOWING_QUOTES,
    quotes: responseData
  }
}



export const showingQuotes = () => {
  return dispatch => {
    dispatch(gettingQuotes());

    let url = "https://type.fit/api/quotes";

    fetch(url).then(response => response.json())
      .then(responseData => {
        if (responseData) {
          dispatch(showingQuoteSuccess(responseData))
        } else {
          dispatch(showingError(responseData));
        }
      }).catch((err) => {
        console.log(err);
      });

  }
}
