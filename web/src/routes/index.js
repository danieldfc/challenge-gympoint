import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import ListStudents from '~/pages/Student/ListStudents';
import UpdateStudent from '~/pages/Student/UpdateStudent';
import CreatedStudent from '~/pages/Student/CreatedStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path="/dashboard/students"
        exact
        component={ListStudents}
        isPrivate
      />
      <Route path="/students/:id" exact component={UpdateStudent} isPrivate />
      <Route
        path="/created/student"
        exact
        component={CreatedStudent}
        isPrivate
      />
    </Switch>
  );
}
