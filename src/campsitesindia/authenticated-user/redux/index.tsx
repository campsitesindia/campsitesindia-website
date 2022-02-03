import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import AuthenticatedUser from './authenticated-user';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute path={match.url} component={AuthenticatedUser} />
    </Switch>

  </>
);

export default Routes;
