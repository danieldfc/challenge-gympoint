import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import api from '~/services/api';

import { Container, Wrapper, Grid, GridButton } from './styles';

export default function ListEnrollment() {
  const [enrollments, setEnrollments] = useState([]);

  async function loadEnrollments() {
    const response = await api.get('/enrollments');

    const data = response.data.map(enrollment => ({
      ...enrollment,
      endDate: format(parseISO(enrollment.end_date), "d' de 'MMMM' de 'yyyy", {
        locale: pt,
      }),
      startDate: format(
        parseISO(enrollment.end_date),
        "d' de 'MMMM' de 'yyyy",
        {
          locale: pt,
        }
      ),
    }));

    setEnrollments(data);
  }

  useEffect(() => {
    document.title = 'Gympoint | Matrículas';

    loadEnrollments();
  }, []);

  async function handleDeleteEnrollment(id) {
    const result = window.confirm(
      'Você realmente quer excluir esta matrícula?'
    );
    if (result) {
      try {
        await api.delete(`/enrollment/${id}`);
        toast.success('Enrollment deleted with success!');
      } catch (err) {
        toast.error('Enrollment deleted failure!');
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando matrícula</h1>
        <div>
          <Link to="/dashboard/enrollments/created">
            <Button type="submit">
              <MdAdd size={20} color="#fff" />
              CADASTRAR
            </Button>
          </Link>
        </div>
      </Wrapper>
      <Grid>
        <li>
          <strong>ALUNO</strong>
          <strong>PLANO</strong>
          <strong>INÍCIO</strong>
          <strong>TÉRMINO</strong>
          <strong>ATIVO</strong>
        </li>
        {enrollments.map(e => (
          <li key={e.id}>
            <p>{e.student.name}</p>
            <p>{e.plan.title}</p>
            <p>{e.startDate}</p>
            <p>{e.endDate}</p>
            <p>
              {e.active ? (
                <MdCheckCircle size={22} color="#42cb59" />
              ) : (
                <MdCheckCircle size={22} color="#ddd" />
              )}
            </p>
            <GridButton>
              <Link to={`/dashboard/enrollments/updated/${e.id}`}>
                <button type="submit">EDITAR</button>
              </Link>
              <button
                type="submit"
                onClick={() => handleDeleteEnrollment(e.id)}
              >
                EXCLUIR
              </button>
            </GridButton>
          </li>
        ))}
      </Grid>
    </Container>
  );
}
