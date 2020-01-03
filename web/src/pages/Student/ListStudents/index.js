import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import api from '~/services/api';

import { Container, Wrapper, Grid, GridButton, Search } from './styles';

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');

  useEffect(() => {
    document.title = 'Gympoint | Alunos';
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }
    loadStudents();
  }, []);

  async function handleDeleteStudent(id) {
    const result = window.confirm(
      'Você realmente quer excluir este estudante?'
    );
    if (result) {
      try {
        await api.delete(`/students/${id}`);
        toast.success('Studante deleted with success!');
      } catch (err) {
        toast.error('Studante deleted failure!');
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <h1>Gerenciando alunos</h1>
        <div>
          <Link to="/dashboard/students/created">
            <Button type="submit">
              <MdAdd size={20} color="#fff" />
              CADASTRAR
            </Button>
          </Link>
          <Search>
            <MdSearch size={20} color="#ccc" />
            <input
              type="text"
              placeholder="Buscar aluno..."
              onChange={e => setStudent(e.target.value)}
              value={student}
            />
          </Search>
        </div>
      </Wrapper>
      <Grid>
        <li>
          <strong>NOME</strong>
          <strong>E-MAIL</strong>
          <strong>IDADE</strong>
        </li>
        {students.map(s => (
          <li key={s.id}>
            <p>{s.name}</p>
            <p>{s.email}</p>
            <p>{s.age}</p>
            <GridButton>
              <Link to={`/dashboard/students/updated/${s.id}`}>
                <button type="submit">EDITAR</button>
              </Link>
              <button type="submit" onClick={() => handleDeleteStudent(s.id)}>
                EXCLUIR
              </button>
            </GridButton>
          </li>
        ))}
      </Grid>
    </Container>
  );
}
