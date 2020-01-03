import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import DatePickerInput from '~/components/DatePickerInput';
import api from '~/services/api';
import history from '~/services/history';

import Select from '../SelectInput';
import { Container, Content } from './styles';

export default function FormEnrollment({
  initialData,
  schema,
  onSubmit,
  type,
  isRegister,
  ...rest
}) {
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [studentId, setStudentId] = useState(null);
  const [planId, setPlanId] = useState(null);

  const [price, setPrice] = useState('R$0,00');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, SetDateEnd] = useState(new Date());

  const [durationPlan, setDurationPlan] = useState(0);

  async function loadPlans() {
    const response = await api.get('/plans');

    const data = response.data.map(plan => ({
      id: plan.id,
      title: plan.title,
    }));

    setPlans(data);
  }

  async function loadStudents() {
    const response = await api.get('/students');

    const data = response.data.map(student => ({
      id: student.id,
      title: student.name,
    }));

    setStudents(data);
  }

  useEffect(() => {
    document.title = 'Gympoint | Matrículas';

    loadPlans();
    loadStudents();
  }, []);

  function calcStartDate(date) {
    setDateStart(date);
    SetDateEnd(addMonths(date, durationPlan));
  }

  function getStudent(student) {
    setStudentId(student.id);
  }

  async function getPlan(plan) {
    const response = await api.get(`/plans/${plan.id}`);
    const { price: price_total, duration } = response.data;
    const total = price_total * duration;

    if (response) {
      SetDateEnd(addMonths(dateStart, duration));
      setPrice(`R$${total},00`);
      setDurationPlan(duration);
    }
    setPlanId(plan.id);
  }

  return (
    <Container>
      <Form
        initialData={initialData}
        schema={schema}
        onSubmit={onSubmit}
        {...rest}
      >
        <div className="header">
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
          <Select
            options={students}
            placeholder="Selecione o aluno"
            onChange={getStudent}
            noOptionsMessage={() => 'Não há alunos'}
            name="student_id"
            label="ALUNO"
            loadOptions={loadStudents}
            cacheOptions
          />
          <div className="numbers">
            <Select
              options={plans}
              placeholder="Selecione o plano"
              onChange={getPlan}
              noOptionsMessage={() => 'Não há planos'}
              name="plan_id"
              loadOptions={loadPlans}
              cacheOptions
              label="PLANO"
            />
            <DatePickerInput
              id="start_date"
              name="start_date"
              dateFormat="dd/MM/yyyy"
              locale={pt}
              onChange={calcStartDate}
              selected={dateStart}
              popperPlacement="center"
              label="DATA DE INÍCIO"
            />
            <DatePickerInput
              id="end_date"
              name="end_date"
              dateFormat="dd/MM/yyyy"
              locale={pt}
              onChange={calcStartDate}
              selected={dateEnd}
              popperPlacement="center"
              disabled
              label="DATA DE TÉRMINO"
            />
            <div>
              <label htmlFor="price">VALOR FINAL</label>
              <Input name="price" value={price} disabled />
            </div>
            <Input type="hidden" name="student_id" value={studentId} disabled />
            <Input type="hidden" name="plan_id" value={planId} disabled />
          </div>
        </Content>
      </Form>
    </Container>
  );
}

FormEnrollment.propTypes = {
  initialData: PropTypes.shape({}),
  schema: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

FormEnrollment.defaultProps = {
  initialData: {},
  schema: {},
};
