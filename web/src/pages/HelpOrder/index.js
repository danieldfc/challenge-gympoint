import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Input } from '@rocketseat/unform';

import api from '~/services/api';
import schema from '~/validators/HelpOrder/Store';

import {
  Container,
  Content,
  ListStudents,
  EmptyContainer,
  AnswerContainer,
  ButtonAnswer,
  FormAnswer,
} from './styles';

export default function HelpOrder() {
  const [studentsHelp, setStudentsHelp] = useState([]);
  const [help, setHelp] = useState(null);

  const [answer, setAnswer] = useState('');

  async function loadStudentsHelp() {
    const response = await api.get('help-orders');

    setStudentsHelp(response.data);
  }

  useEffect(() => {
    document.title = 'Gympoint | Pedidos de auxílio';

    loadStudentsHelp();
  }, []);

  function handleOpenedCollapse(helpped) {
    setHelp(helpped);
  }

  async function handleAnswer(data) {
    try {
      await api.post(`/help-orders/${help.id}/answer`, data);

      setHelp(null);
      loadStudentsHelp();
      toast.success('Student answered with success');
    } catch (err) {
      toast.error('Answered failure');
    }
  }

  return (
    <Container>
      <h1>Pedidos de auxílio</h1>
      <Content>
        {studentsHelp.length > 0 ? (
          <>
            <h1>ALUNO</h1>
            <ListStudents>
              {studentsHelp.map(studHelp => (
                <li key={studHelp.id}>
                  <p>{studHelp.student.name}</p>
                  <button
                    type="button"
                    onClick={() => handleOpenedCollapse(studHelp)}
                  >
                    responder
                  </button>
                </li>
              ))}
            </ListStudents>
          </>
        ) : (
          <EmptyContainer>
            <MdDelete size={60} color="#999" />
            <p>NÃO HÁ SOLICITAÇÕES</p>
          </EmptyContainer>
        )}
      </Content>
      {help && (
        <AnswerContainer>
          <FormAnswer onSubmit={handleAnswer} schema={schema}>
            <div>
              <h1>PERGUNTA DO ALUNO</h1>
              <button onClick={() => setHelp(null)} type="button">
                X
              </button>
            </div>
            <p>{help.question}</p>
            <Input
              multiline
              name="answer"
              onChange={e => setAnswer(e.target.value)}
              value={answer}
              label="SUA RESPOSTA"
              placeholder="exemplo@email.com"
            />
            <ButtonAnswer type="submit">Responder aluno</ButtonAnswer>
          </FormAnswer>
        </AnswerContainer>
      )}
    </Container>
  );
}
