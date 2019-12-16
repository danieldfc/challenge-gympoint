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
