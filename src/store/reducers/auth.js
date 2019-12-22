import * as actionTypes from '../../constants/action_types';
import { updateObject } from '../../utilities/updateObject';

const initialState = {
    token: null,
    userId: null,
    userName: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        error: null,
        loading: false,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        userName: null,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;

    }
}

export default reducer;
