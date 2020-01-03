import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import Select from 'react-select';

import { Form, Input } from '@rocketseat/unform';
import { addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import DatePickerInput from '~/components/DatePickerInput';
import api from '~/services/api';
import history from '~/services/history';

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

  useEffect(() => {
    document.title = 'Gympoint | Matrículas';

    async function loadPlans() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }

    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }

    loadPlans();
    loadStudents();
  }, []);

  const optStudents = students.map(student => ({
    value: `${student.id}`,
    label: `${student.name}`,
  }));

  const optPlans = plans.map(plan => ({
    value: `${plan.id}`,
    label: `${plan.title}`,
  }));

  function calcStartDate(date) {
    setDateStart(date);
    SetDateEnd(addDays(date, durationPlan * 30));
  }

  function getStudent(student) {
    setStudentId(student.value);
  }

  async function getPlan(plan) {
    const response = await api.get(`/plans/${plan.value}`);
    const { price: price_total, duration } = response.data;
    const total = price_total * duration;

    if (response) {
      SetDateEnd(addDays(dateStart, duration * 30));
      setPrice(`R$${total},00`);
      setDurationPlan(duration);
    }
    setPlanId(plan.value);
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
          <div className="wrapper">
            <label htmlFor="students">ALUNO </label>
            <Select
              name="students"
              placeholder="Buscar aluno"
              options={optStudents}
              isSearchable
              onChange={value => getStudent(value)}
            />
          </div>
          <div className="numbers">
            <div>
              <label htmlFor="plans">PLANO</label>
              <Select
                name="plans"
                options={optPlans}
                placeholder="Selecione o plano"
                onChange={value => getPlan(value)}
              />
            </div>
            <div>
              <label htmlFor="date_start">DATA DE INÍCIO</label>
              <DatePickerInput
                id="date_start"
                name="date_start"
                dateFormat="dd/MM/yyyy"
                locale={pt}
                onChange={calcStartDate}
                selected={dateStart}
                value={this}
                popperPlacement="center"
              />
            </div>
            <div>
              <label htmlFor="date_end">DATA DE TÉRMINO</label>
              <DatePickerInput
                id="date_end"
                name="date_end"
                dateFormat="dd/MM/yyyy"
                locale={pt}
                selected={dateEnd}
                value={this}
                popperPlacement="center"
                disabled
              />
            </div>
            <div>
              <label htmlFor="price_total">VALOR FINAL</label>
              <Input name="price_total" value={price} disabled />
            </div>
            <Input type="hidden" name="student_id" value={studentId} />
            <Input type="hidden" name="plan_id" value={planId} />
            <Input type="hidden" name="start_date" value={dateStart} />
          </div>
        </Content>
      </Form>
    </Container>
  );
}

FormEnrollment.propTypes = {
  initialData: PropTypes.shape(),
  schema: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isRegister: PropTypes.bool.isRequired,
};

FormEnrollment.defaultProps = {
  initialData: {},
  schema: {},
};
