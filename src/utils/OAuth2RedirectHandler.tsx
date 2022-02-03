import React, {useEffect, useLayoutEffect} from 'react';


import { logout } from 'shared/reducers/authentication';
import {Redirect, RouteComponentProps} from "react-router";


export const OAuth2RedirectHandler = (props: RouteComponentProps<{ url: string }>) => {

    const ACCESS_TOKEN= 'jhi-authenticationToken'
    const getUrlParameter = (name) =>  {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        return <Redirect to={{
            pathname: "/",
            state: { from: props.location }
        }}/>;
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: {
                from: props.location,
                error: error
            }
        }}/>;
    }


    return (
        <div>

            <Redirect to={"/"} />
        </div>
    );
};

export default OAuth2RedirectHandler;
