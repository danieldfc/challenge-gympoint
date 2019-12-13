import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import ListAlunos from '~/pages/ListAlunos';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard/alunos" exact component={ListAlunos} isPrivate />
    </Switch>
  );
}
