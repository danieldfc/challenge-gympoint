import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const [studentId, setStudentId] = useState(null);

  function handleSubmit() {
    dispatch(signInRequest(studentId));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          value={studentId}
          onChangeText={setStudentId}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
