import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Wrapper, Grid, GridButton } from './styles';

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }
    loadStudents();
  }, [students]);

  function handleSubmit() {
    history.push('/created/student');
  }

  function handleUpdateStudent(id) {
    history.push(`/students/${id}`);
  }

  async function handleDeleteStudent(id) {
    await api.delete(`/students/${id}`);
  }

  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando alunos</h1>
        <div>
          <button type="submit" onClick={handleSubmit}>
            <MdAdd size={24} color="#fff" />
            CADASTRAR
          </button>
          <input
            type="text"
            placeholder="Buscar aluno..."
            onChange={setStudent}
            value={student}
          />
        </div>
      </Wrapper>
      <Content>
        <Grid>
          <li>
            <strong>NAME</strong>
            <strong>E-MAIL</strong>
            <strong>IDADE</strong>
          </li>
          {students.map(s => (
            <li key={s.id}>
              <p>{s.name}</p>
              <p>{s.email}</p>
              <p>{s.age}</p>
              <GridButton>
                <button type="submit" onClick={() => handleUpdateStudent(s.id)}>
                  EDITAR
                </button>
                <button type="submit" onClick={() => handleDeleteStudent(s.id)}>
                  EXCLUIR
                </button>
              </GridButton>
            </li>
          ))}
        </Grid>
      </Content>
    </Container>
  );
}
