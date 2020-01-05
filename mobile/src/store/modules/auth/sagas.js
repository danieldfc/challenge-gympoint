import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';
import AuthTypes from './types';

export function* signIn({ payload }) {
  try {
    const { student_id } = payload;

    const response = yield call(api.get, `students/${student_id}`);

    yield put(signInSuccess(response.data));

    // history.push('/dashboard/students');
  } catch (err) {
    Alert.alert('Erro no login', 'Authentication failure, verify data.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { student } = payload.auth;

  if (student) {
    AsyncStorage.getItem('persist:gympoint');
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
