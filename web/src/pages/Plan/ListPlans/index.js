import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Wrapper, Grid, GridButton } from './styles';

export default function ListPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    document.title = 'Gympoint | Plan';
    async function loadPlans() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }
    loadPlans();
  }, []);

  function handleSubmit() {
    history.push('/dashboard/plans/created');
  }

  async function handleDeletePlan(id) {
    const result = window.confirm('Deseja realmente excluir este plano?');

    if (result) {
      try {
        await api.delete(`/plans/${id}`);
        toast.success('Plan deleted with success!');
      } catch (err) {
        toast.error('Plan deleted failure!');
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando planos</h1>
        <Button
          type="submit"
          onClick={handleSubmit}
          style={{ background: '#ee4d64' }}
        >
          <MdAdd size={22} color="#fff" />
          CADASTRAR
        </Button>
      </Wrapper>
      <Grid>
        <li>
          <strong>TÍTULO</strong>
          <strong>DURAÇÃO</strong>
          <strong>VALOR p/MÊS</strong>
        </li>
        {plans.map(p => (
          <li key={p.id}>
            <p>{p.title}</p>
            <p>
              {p.duration === '1' ? `${p.duration} mês` : `${p.duration} meses`}
            </p>
            <p>R${p.price},00</p>
            <GridButton>
              <Link to={`/dashboard/plans/updated/${p.id}`}>
                <button type="submit">EDITAR</button>
              </Link>
              <button type="submit" onClick={() => handleDeletePlan(p.id)}>
                EXCLUIR
              </button>
            </GridButton>
          </li>
        ))}
      </Grid>
    </Container>
  );
}
