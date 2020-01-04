import AuthTypes from './types';

export function signInRequest(student_id) {
  return {
    type: AuthTypes.SIGN_IN_REQUEST,
    payload: { student_id },
  };
}

export function signInSuccess(student) {
  return {
    type: AuthTypes.SIGN_IN_SUCCESS,
    payload: { student },
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
