import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../config/store';
import { logout } from 'shared/reducers/authentication';
import {Redirect} from "react-router";

export const Logout = () => {
    const dispatch = useAppDispatch();
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const idToken = useAppSelector(state => state.authentication.idToken);


  useLayoutEffect(() => {

    dispatch(logout());
    if (logoutUrl) {
      // if Keycloak, logoutUrl has protocol/openid-connect in it
      window.location.href = logoutUrl.includes('/protocol')
        ? logoutUrl + '?redirect_uri=' + window.location.origin
        : logoutUrl + '?id_token_hint=' + idToken + '&post_logout_redirect_uri=' + window.location.origin;
    }
  },[]);

  return (
      <div>

      <Redirect to={"/"} />
      </div>
  );
};

export default Logout;
