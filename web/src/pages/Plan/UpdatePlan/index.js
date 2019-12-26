import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import Form from '~/components/Form';
import api from '~/services/api';
import history from '~/services/history';
import schema from '~/validators/Plan/Update';

export default function UpdatePlan({ match }) {
  const [plan, setPlan] = useState({});
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/plans/${id}`);

      setPlan(response.data);
    }
    loadStudent();
  }, [id, plan]);

  async function handleUpdatePlan(data) {
    try {
      await api.put(`/plans/${id}`, data);
      toast.success('Plan updated with success!');
      history.push('/dashboard/plans');
    } catch (err) {
      toast.error('Plan request failure!');
    }
  }

  return (
    <Form
      initialData={plan}
      schema={schema}
      onSubmit={handleUpdatePlan}
      id={id}
      type="plano"
    />
  );
}

UpdatePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

UpdatePlan.defaultProps = {
  match: {},
};
