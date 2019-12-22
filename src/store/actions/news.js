import * as actionTypes from '../../constants/action_types';
import * as projectConstant from '../../constants/projects';


export const gettingNews = () => {
  return {
    type: actionTypes.GETTING_NEWS
  }
}


export const showingError = (error) => {
  return {
    type: actionTypes.SHOWING_ERROR,
    error: error
  }
}


export const showingNewsSuccess = (responseData) => {
  return {
    type: actionTypes.SHOWING_NEWS,
    totalResults: responseData.totalResults,
    articles: responseData.articles
  }
}



export const showingNews = () => {
  return dispatch => {
    dispatch(gettingNews());

    const key = projectConstant.NEWS_API_KEY;

    let url = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=5&apiKey=" + key

    fetch(url).then(response => response.json())
      .then(responseData => {
        console.log(responseData.totalResults);
        if (responseData.status) {
          dispatch(showingNewsSuccess(responseData))
        } else {
          dispatch(showingError(responseData.message));
        }
      }).catch((err) => {
        dispatch(showingError(err.message));
      });

  }
}
