import {Auth0Lock} from 'auth0-lock';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,

  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL,

  SHOW_LOCK,
  LOCK_SUCCESS,
  LOCK_ERROR
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, pic, description) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, pic, email, password,description },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
  
    dispatch({ type: USERS_FETCH_REQUEST });
    const { data } = await axios.get("/api/users/fetch");
    dispatch({ type: USERS_FETCH_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USERS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// OAUTH

export const showLock =() => {
  return {
    type: SHOW_LOCK
  }
};

export const lockSuccess =(profile, token) => {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
};

export const lockError =(err) => {
  return {
    type: LOCK_ERROR,
    err
  }
};

const lock = new Auth0Lock('uP2jbsdQ1lhbxUht7Kdn6reYbFijRF5Z', 'errandx.auth0.com');

export function oauthLogin() {
  // display lock widget
  return dispatch => {
    lock.show();
  }
}
// Listen to authenticated event and get the profile of the user
export function doAuthentication() {
  return dispatch => {
    lock.on("authenticated", function(authResult) {
          lock.getProfile(authResult.idToken, function(error, profile) {

            if (error) {
              // handle error
              return dispatch(lockError(error))
            }

            localStorage.setItem('profile', JSON.stringify(profile))
            localStorage.setItem('id_token', authResult.idToken)
            return dispatch(lockSuccess(profile))
          });
    });
  }
}

