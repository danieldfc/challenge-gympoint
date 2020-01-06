import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Student/Update';

import { Container, Content, FormSubmit, Wrapper, Child } from './styles';

export default function UpdateStudent({ match }) {
  const [student, setStudent] = useState({});
  const { id } = match.params;

  useEffect(() => {
    document.title = 'Gympoint | Alunos';
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
    <Container>
      <FormSubmit
        onSubmit={handleUpdateStudent}
        schema={schema}
        initialData={student}
      >
        <Content>
          <h1>Cadastro de aluno</h1>
          <div>
            <Button type="button" onClick={() => history.goBack()}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              VOLTAR
            </Button>
            <Button type="submit">
              <MdDone size={22} color="#fff" />
              SALVAR
            </Button>
          </div>
        </Content>
        <Child>
          <Wrapper>
            <div>
              <Input name="name" label="NOME COMPLETO" placeholder="John Doe" />
            </div>
          </Wrapper>
          <Wrapper>
            <div>
              <Input
                name="email"
                label="SEU ENDEREÇO DE EMAIL"
                placeholder="exemplo@email.com"
              />
            </div>
          </Wrapper>
          <Wrapper>
            <div>
              <Input type="number" name="age" label="IDADE" />
            </div>
            <div>
              <Input type="decimal" name="weight" label="PESO em (kg)" />
            </div>
            <div>
              <Input type="decimal" name="height" label="ALTURA" />
            </div>
          </Wrapper>
        </Child>
      </FormSubmit>
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
