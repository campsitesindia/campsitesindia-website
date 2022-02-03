import React, { useState, useEffect } from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../config/store';
import { login } from 'shared/reducers/authentication';
import {Helmet} from "react-helmet";

import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Checkbox from "../../shared/Checkbox/Checkbox";
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "./constant";
const loginSocials = [
    {
        name: "Continue with Facebook",
        href: {FACEBOOK_AUTH_URL}.FACEBOOK_AUTH_URL,
        icon: facebookSvg,
    },
    {
        name: "Continue with Twitter",
        href: "#",
        icon: twitterSvg,
    },
    {
        name: "Continue with Google",
        href: {GOOGLE_AUTH_URL}.GOOGLE_AUTH_URL,
        icon: googleSvg,
    },
];
export const Login = (props: RouteComponentProps<any>,className) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);

  const handleLogin = (username, password, rememberMe = false) => dispatch(login(username, password, rememberMe));

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        //alert(userName+password+rememberMe)

        handleLogin(userName,password,rememberMe)
    }

  const { location } = props;
  const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  if (isAuthenticated) {
     // alert(isAuthenticated)
    return <Redirect to={from} />;
  }

    return(

        <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
          <title>Login || CampsitesIndia</title>
      </Helmet>

            <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Login
          </h2>
          <div className="max-w-md mx-auto space-y-6">


              {/* FORM */}
              <form className="grid grid-cols-1 gap-6" onSubmit={submitForm}>
                  {loginError ? (
                      <span className="text-red-800">

                              <strong>Failed to sign in!</strong> Please check your credentials and try again.
                      </span>
                  ) : null}
                  <label className="block">

              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
                      <Input
                          type="text"
                          placeholder="example@example.com"
                          className="mt-1"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                      />
                  </label>
                  <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
                      <Input type="password" className="mt-1"

                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                      />

                  </label>

                  <label className="block">


                      <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                             Remember Me
                          <input
                              defaultChecked={rememberMe}
                              //id={id + name}
                              name="RememberMe"
                              type="checkbox"
                              onChange={(e) => setRememberMe(e.target.checked)}
                          />
              </span>


                  </label>

                  <ButtonPrimary type="submit">Continue</ButtonPrimary>
              </form>
              <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
                  <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
              </div>
              <div className="grid gap-3">
                  {loginSocials.map((item, index) => (
                      <a
                          key={index}
                          href={item.href}
                          className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                      >
                          <img
                              className="flex-shrink-0"
                              src={item.icon}
                              alt={item.name}
                          />
                          <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                              {item.name}
                          </h3>
                      </a>
                  ))}
              </div>
              {/* OR */}
              {/* ==== */}
              <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
                  <Link to="/signup">Create an account</Link>
          </span>
          </div>
      </div>

  </div>


            );


};

export default Login;
