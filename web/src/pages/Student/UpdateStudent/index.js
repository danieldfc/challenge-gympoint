import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  age: Yup.number()
    .positive()
    .integer(),
  weight: Yup.number().positive(),
  height: Yup.number().positive(),
});

export default function UpdateStudent({ match }) {
  const [student, setStudent] = useState({});
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/students/${id}`);

      setStudent(response.data);
    }
    loadStudent();
  }, [id]);

  async function handleUpdateStudent(data) {
    try {
      await api.put(`/students/${id}`, data);
      history.push('/dashboard/students');
      toast.success('Student updated with success.');
    } catch (err) {
      toast.error('Student update failure.');
    }
  }

  return (
    <Form
      initialData={student}
      schema={schema}
      onSubmit={handleUpdateStudent}
      id={id}
    />
  );
}

UpdateStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

UpdateStudent.defaultProps = {
  match: {},
};
