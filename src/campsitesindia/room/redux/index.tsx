import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import Room from './room';
import RoomDetail from './room-detail';


const Routes = ({ match }) => (
  <>
    <Switch>

      <ErrorBoundaryRoute exact path={`${match.url}/listing/:id`} component={RoomDetail} />
      <ErrorBoundaryRoute path={match.url} component={Room} />
    </Switch>
  </>
);

export default Routes;
