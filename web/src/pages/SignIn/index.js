import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório!'),
  password: Yup.string().required('A senha é obrigatória!'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSignIn({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />
      <Form onSubmit={handleSignIn} schema={schema}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <label htmlFor="password">SUA SENHA</label>
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
