import React from 'react';
import { toast } from 'react-toastify';

import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan/Store';

export default function CreatePlans() {
  async function handleCreatePlan(data) {
    try {
      await api.post('/plans', data);
      toast.success('Plan created with success!');
      history.push('/dashboard/plans');
    } catch (err) {
      toast.error('Plan request failure!');
      console.tron.log(err);
    }
  }

  return (
    <Form schema={schema} onSubmit={handleCreatePlan} type="plano" isRegister />
  );
}
