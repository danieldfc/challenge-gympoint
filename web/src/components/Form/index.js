import React from 'react';
import { MdKeyboardBackspace, MdSave } from 'react-icons/md';
import { Form as ContainerForm, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import history from '~/services/history';

import Button from '~/components/Button';

import { Container, Content } from './styles';

export default function Form({ initialData, schema, onSubmit, id, ...rest }) {
  return (
    <Container>
      <ContainerForm
        initialData={initialData}
        schema={schema}
        onSubmit={onSubmit}
        {...rest}
      >
        <div>
          <h1>{id ? 'Edição de aluno' : 'Cadastrar aluno'}</h1>
          <div>
            <Button type="button" onClick={() => history.goBack()}>
              <MdKeyboardBackspace size={24} color="#fff" />
              VOLTAR
            </Button>
            <Button type="submit">
              <MdSave size={24} color="#fff" />
              {id ? 'SAVE' : 'CREATE'}
            </Button>
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
              <Input type="decimal" name="weight" placeholder="Peso (Kg)" />
            </div>
            <div>
              <label htmlFor="height">ALTURA</label>
              <Input type="decimal" name="height" placeholder="Altura" />
            </div>
          </div>
        </Content>
      </ContainerForm>
    </Container>
  );
}

Form.propTypes = {
  initialData: PropTypes.shape(),
  schema: PropTypes.shape(),
  onSubmit: PropTypes.func,
  id: PropTypes.string,
};

Form.defaultProps = {
  initialData: {},
  schema: {},
  onSubmit: () => {},
  id: '',
};
