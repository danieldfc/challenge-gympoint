import React, { useEffect, useState } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan/Update';

import {
  Container,
  Content,
  FormSubmit,
  Wrapper,
  Child,
  FormInput,
} from './styles';

export default function UpdatePlan({ match }) {
  const [plan, setPlan] = useState({});
  const { id } = match.params;

  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    const newPrice = duration * price;

    setPriceTotal(newPrice);
  }, [duration, price]);

  async function loadPlan() {
    const response = await api.get(`/plans/${id}`);

    const { duration: planDuration, price: planPrice } = response.data;

    const newPrice = planDuration * planPrice;

    setPlan(response.data);
    setPrice(planPrice);
    setDuration(planDuration);
    setPriceTotal(newPrice);
  }

  useEffect(() => {
    document.title = 'Gympoint | Plano';
    loadPlan();
  }, []); // eslint-disable-line

  async function handleUpdatePlan(data) {
    try {
      await api.put(`/plans/${id}`, data);

      toast.success('Plan updated with success!');

      history.push('/dashboard/plans');
    } catch (err) {
      alert(JSON.stringify(err));
      toast.error('Plan request failure!');
    }
  }

  return (
    <Container>
      <FormSubmit
        onSubmit={handleUpdatePlan}
        schema={schema}
        initialData={plan}
      >
        <Content>
          <h1>Edição de plano</h1>
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

UpdatePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

UpdatePlan.defaultProps = {
  match: {},
};
