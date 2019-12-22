import * as actionTypes from '../../constants/action_types';
import * as projectConstant from '../../constants/projects';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId,userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userName: userName,
  }
}

export const authFail = (error) => {

  var errorName = "";
  if (error === "EMAIL_NOT_FOUND") {
    errorName = "E-Mail not found";
  } else if (error === "INVALID_PASSWORD") {
    errorName = "Invalid password";
  } else if (error === "USER_DISABLED") {
    errorName = "User disabled";
  } else {
    errorName = "Unknown error";
  }

  return {
    type: actionTypes.AUTH_FAIL,
    error: errorName
  }
}

export const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('expiration_time');

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}


export const tryLogin = (email, password, isLogin = true) => {
  return dispatch => {
    dispatch(authStart());

    const authData = JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    });

    const key = projectConstant.PROJECT_API_KEY;

    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + key;

    if (!isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + key;
    }

    fetch(url, {
        method: 'POST',
        body: authData,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
      .then(responseData => {

        if (responseData.error) {
          dispatch(authFail(responseData.error.message));
        } else {
          const userName = email.split("@")[0];
          const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000);
          localStorage.setItem('token', responseData.idToken);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', responseData.localId);
          localStorage.setItem('userName', userName);
          dispatch(authSuccess(responseData.idToken, responseData.localId,userName));
          dispatch(checkAuthTimeout(responseData.expiresIn));
        }
      }).catch((err) => {
        dispatch(authFail(err.error));
      });

  }
}
