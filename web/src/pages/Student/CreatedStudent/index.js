import React from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Input } from '@rocketseat/unform';

import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Student/Store';

import { Container, Content, FormSubmit, Wrapper, Child } from './styles';

export default function CreatedStudent() {
  async function handleCreatedStudent(data) {
    try {
      await api.post('/students', data);
      history.push('/dashboard/students');
      toast.success('Studnent created with success!');
    } catch (err) {
      toast.error('Student created failure, verify your data!');
    }
  }
  return (
    <Container>
      <FormSubmit onSubmit={handleCreatedStudent} schema={schema}>
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
