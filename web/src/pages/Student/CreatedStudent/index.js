import React from 'react';
import { toast } from 'react-toastify';

import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Student/Store';

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
  return (
    <Form
      schema={schema}
      onSubmit={handleCreatedStudent}
      type="aluno"
      isRegister
    />
  );
}
