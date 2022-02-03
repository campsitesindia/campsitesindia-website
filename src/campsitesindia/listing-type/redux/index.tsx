import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import ListingType from './listing-type';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute path={match.url} component={ListingType} />
    </Switch>
  </>
);

export default Routes;
