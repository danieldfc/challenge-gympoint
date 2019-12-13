import AuthTypes from './types';

export function signInRequest(email, password) {
  return {
    type: AuthTypes.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(user, token) {
  return {
    type: AuthTypes.SIGN_IN_SUCCESS,
    payload: { user, token },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: AuthTypes.SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: AuthTypes.SIGN_FAILURE,
  };
}

export function signOut() {
  return {
    type: AuthTypes.SIGN_OUT,
  };
}
