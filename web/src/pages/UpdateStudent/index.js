import React, { useState, useEffect } from 'react';
import { MdKeyboardBackspace, MdSave } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

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
      const response = await api.put(`/students/${id}`, data);

      console.tron.log(response);
      history.push('/dashboard/students');
      toast.success('Student updated with success.');
    } catch (err) {
      toast.error('Student update failure.');
    }
  }

  return (
    <Container>
      <Form
        initialData={student}
        schema={schema}
        onSubmit={handleUpdateStudent}
      >
        <div>
          <h1>Edição de aluno</h1>
          <div>
            <button type="submit" onClick={() => history.goBack()}>
              <MdKeyboardBackspace size={24} color="#fff" />
              VOLTAR
            </button>
            <button type="submit">
              <MdSave size={24} color="#fff" />
              SAVE
            </button>
          </div>
        </div>

        <Content>
          <div>
            <label htmlFor="name">NOME </label>
            <Input type="text" name="name" placeholder="Name" />
            <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
            <Input type="email" name="email" placeholder="Email" />
          </div>
          <div className="numbers">
            <div>
              <label htmlFor="age">IDADE</label>
              <Input type="number" name="age" placeholder="Idade" />
            </div>
            <div>
              <label htmlFor="weight">PESO (em kg)</label>
              <Input type="number" name="weight" placeholder="Peso (Kg)" />
            </div>
            <div>
              <label htmlFor="height">ALTURA</label>
              <Input type="number" name="height" placeholder="Altura" />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
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
