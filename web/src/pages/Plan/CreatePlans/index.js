import React, { useEffect, useState } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan/Store';

import {
  Container,
  Content,
  FormSubmit,
  Wrapper,
  Child,
  FormInput,
} from './styles';

export default function CreatePlans() {
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const newPrice = duration * price;

    setPriceTotal(newPrice);
  }, [duration, price]);

  useEffect(() => {
    document.title = 'Gympoint | Plano';
  }, []);

  async function handleCreatePlan(data) {
    try {
      await api.post('/plans', data);

      toast.success('Plan created with success!');

      history.push('/dashboard/plans');
    } catch (err) {
      toast.error('Plan request failure!');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <FormSubmit onSubmit={handleCreatePlan} schema={schema}>
        <Content>
          <h1>Cadastro de plano</h1>
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
              <FormInput name="title" label="TÍTULO DO PLANO" />
            </div>
          </Wrapper>
          <Wrapper>
            <div>
              <FormInput
                type="number"
                name="duration"
                label="DURAÇÃO (em meses)"
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <FormInput
                type="decimal"
                name="price"
                label="PREÇO MENSAL"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <FormInput
                name="price_total"
                label="PREÇO TOTAL"
                disabled
                value={`R$${priceTotal},00`}
              />
            </div>
          </Wrapper>
        </Child>
      </FormSubmit>
    </Container>
  );
}
