import React from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  age: Yup.number()
    .positive()
    .integer()
    .required(),
  weight: Yup.number()
    .positive()
    .required(),
  height: Yup.number()
    .positive()
    .required(),
});

export default function CreatedStudent() {
  async function handleCreatedStudent(data) {
    try {
      await api.post('/students', data);
      history.push('/dashboard/students');
      toast.success('Studnent created with success!');
    } catch (err) {
      toast.error('Studnent created failure, verify your data!');
    }
  }
  return <Form schema={schema} onSubmit={handleCreatedStudent} />;
}
