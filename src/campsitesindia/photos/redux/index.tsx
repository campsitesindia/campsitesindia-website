import React from 'react';
import {Switch} from 'react-router-dom';

import ErrorBoundaryRoute from 'shared/error/error-boundary-route';

import Photos from './photos';
import PhotosDetail from './photos-detail';


const Routes = ({ match }) => (
  <>
    <Switch>

      {/*<ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PhotosDetail} />*/}
      <ErrorBoundaryRoute path={match.url} component={Photos} />
    </Switch>
  </>
);

export default Routes;
