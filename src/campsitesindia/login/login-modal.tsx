import React from 'react';
import { Translate, translate, ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import {Helmet} from "react-helmet";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from './constant';

import Input from "../../shared/Input/Input";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
    className?: string;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

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

const LoginModal = (props: ILoginModalProps,className) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  return (
      <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
          <ModalBody>
      <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
          <Helmet>
              <title>Login || CampsitesIndia</title>
          </Helmet>
          <div className="container mb-24 lg:mb-32">
              <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                  Login
              </h2>
              <div className="max-w-md mx-auto space-y-6">
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
                  <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
                      <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
                  </div>
                  {/* FORM */}
                  <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(login)}>
                      <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
                          <Input
                              type="email"
                              placeholder="example@example.com"
                              className="mt-1"
                          />
                      </label>
                      <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
                          <Input type="password" className="mt-1" />
                      </label>
                      <ButtonPrimary type="submit">Continue</ButtonPrimary>
                  </form>

                  {/* ==== */}
                  <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
                      <Link to="/signup">Create an account</Link>
          </span>
              </div>
          </div>
      </div>
          </ModalBody>
      </Modal>
  )
};

export default LoginModal;



