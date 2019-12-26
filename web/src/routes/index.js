import React from 'react';
import { Switch } from 'react-router-dom';

import CreatePlans from '~/pages/Plan/CreatePlans';
import ListPlans from '~/pages/Plan/ListPlans';
import UpdatePlan from '~/pages/Plan/UpdatePlan';
import SignIn from '~/pages/SignIn';
import CreatedStudent from '~/pages/Student/CreatedStudent';
import ListStudents from '~/pages/Student/ListStudents';
import UpdateStudent from '~/pages/Student/UpdateStudent';

import Route from './Route';

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
      <Route
        path="/dashboard/students/updated/:id"
        exact
        component={UpdateStudent}
        isPrivate
      />
      <Route
        path="/dashboard/students/created"
        exact
        component={CreatedStudent}
        isPrivate
      />

      <Route path="/dashboard/plans" exact component={ListPlans} isPrivate />
      <Route
        path="/dashboard/plans/updated/:id"
        exact
        component={UpdatePlan}
        isPrivate
      />
      <Route
        path="/dashboard/plans/created"
        exact
        component={CreatePlans}
        isPrivate
      />
    </Switch>
  );
}
