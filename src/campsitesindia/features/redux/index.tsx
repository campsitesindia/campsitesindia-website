import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import Features from './features';
import FeaturesDetail from './features-detail';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute exact path={`${match.url}/listing/:id`} component={FeaturesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Features} />
    </Switch>

  </>
);

export default Routes;
