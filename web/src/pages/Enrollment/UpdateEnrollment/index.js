import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormEnrollment from '~/components/FormEnrollment';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Enrollment/Update';

export default function UpdateEnrollment() {
  const [enrollment, setEnrollment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`/enrollments/${id}`);

      setEnrollment(response.data);
    }
    loadEnrollment();
  }, [id]);

  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.put(`/enrollments/${id}`, {
        student_id,
        plan_id,
        start_date,
      });

      history.push('/dashboard/enrollments');
      toast.success('Enrollment updated with success!');
    } catch (err) {
      toast.error('Enrollment failure!');
      console.tron.log(err);
    }
  }

  return (
    <FormEnrollment
      type="matrícula"
      schema={schema}
      isRegister={false}
      onSubmit={handleSubmit}
      initialData={enrollment}
    />
  );
}
