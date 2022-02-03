import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import FeaturesListing from './features-listing';
import FeaturesListingUpdate from "./features-listing-update";


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FeaturesListingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FeaturesListingUpdate} />


    </Switch>

  </>
);

export default Routes;
