import React from 'react';
import { toast } from 'react-toastify';

import FormEnrollment from '~/components/FormEnrollment';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Enrollment/Store';

export default function CreateEnrollment() {
  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post(`/enrollments/${student_id}/student`, {
        plan_id,
        start_date,
      });

      history.push('/dashboard/enrollments');
      toast.success('Enrollment created with success!');
    } catch (err) {
      toast.error('Enrollment failure!');
      console.tron.log(err);
    }
  }

  return (
    <FormEnrollment
      type="matrícula"
      schema={schema}
      isRegister
      onSubmit={handleSubmit}
    />
  );
}
