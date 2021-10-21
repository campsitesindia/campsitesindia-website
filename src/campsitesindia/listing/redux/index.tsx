import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import Listing from './listing';
import ListingDetail from './listing-detail';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ListingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Listing} />
    </Switch>

  </>
);

export default Routes;
