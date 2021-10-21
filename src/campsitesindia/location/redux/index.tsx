import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import Location from './location';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute path={match.url} component={Location} />
    </Switch>

  </>
);

export default Routes;
