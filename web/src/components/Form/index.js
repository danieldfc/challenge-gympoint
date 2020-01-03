import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import { Form as ContainerForm, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function Form({
  initialData,
  schema,
  onSubmit,
  type,
  isRegister,
  ...rest
}) {
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const newPrice = duration * price;

    setPriceTotal(newPrice);
  }, [duration, price]);

  return (
    <Container>
      <ContainerForm
        initialData={initialData}
        schema={schema}
        onSubmit={onSubmit}
        {...rest}
      >
        <div>
          <h1>{isRegister ? `Cadastro de ${type}` : `Edição de ${type}`}</h1>
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
        </div>

        <Content>
          {type === 'aluno' ? (
            <>
              <div>
                <label htmlFor="name">NOME COMPLETO </label>
                <Input type="text" name="name" placeholder="John Doe" />
                <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                />
              </div>
              <div className="numbers">
                <div>
                  <label htmlFor="age">IDADE</label>
                  <Input type="number" name="age" />
                </div>
                <div>
                  <label htmlFor="weight">PESO (em kg)</label>
                  <Input type="number" name="weight" />
                </div>
                <div>
                  <label htmlFor="height">ALTURA</label>
                  <Input type="number" name="height" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="title">TÍTULO DO PLANO</label>
                <Input type="text" name="title" />
              </div>
              <div className="numbers">
                <div>
                  <label htmlFor="duration">DURAÇÃO (em meses)</label>
                  <Input
                    type="number"
                    name="duration"
                    placeholder="duração"
                    onChange={e => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price">PREÇO MENSAL</label>
                  <Input
                    type="decimal"
                    name="price"
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price_total">PREÇO TOTAL</label>
                  <Input
                    type="decimal"
                    name="price_total"
                    disabled
                    value={`R$${priceTotal},00`}
                  />
                </div>
              </div>
            </>
          )}
        </Content>
      </ContainerForm>
    </Container>
  );
}

Form.propTypes = {
  initialData: PropTypes.shape(),
  schema: PropTypes.shape(),
  onSubmit: PropTypes.func,
  type: PropTypes.string.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

Form.defaultProps = {
  initialData: {},
  schema: {},
  onSubmit: () => {},
};
