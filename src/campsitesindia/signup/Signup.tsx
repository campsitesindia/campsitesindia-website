import {Tab} from "@headlessui/react";
import {PencilAltIcon} from "@heroicons/react/outline";
import React, {FC, Fragment, useEffect, useState} from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import {useAppDispatch, useAppSelector} from "../config/store";
import {handleRegister, reset} from "../account/register/register.reducer";
import {toast} from "react-toastify";
import {translate} from "react-jhipster";
import {defaultValue, IUser} from "../user/model/user.model";
import PasswordStrengthBar from "../../shared/password/password-strength-bar";

export interface SignupProps {
    className?: string;
}

const Signup: FC<SignupProps> = ({ className = "" }) => {
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [login, setlogin] = useState('');
    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[email,setEmail] = useState('')
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(reset());
        },
        []
    );

    const currentLocale = 'en'

    const handleValidSubmit = ( username, email, firstPassword,firstName,lastName ) => {

        dispatch(handleRegister({ activated:true,login: username, email, password: firstPassword, langKey: currentLocale,firstName:firstName,
            lastName:lastName
        }));
    };

    const updatePassword = event => setPassword(event.target.value);

    const successMessage = useAppSelector(state => state.register.successMessage);
    const errorMessage = useAppSelector(state => state.register.errorMessage);

    useEffect(() => {
        if (successMessage) {

            toast.success("Success");
        }

    }, [errorMessage,successMessage]);
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        //alert(userName+password+rememberMe)
        handleValidSubmit(email,email,password,firstName,lastName)
    }

    const renderContent = () => {
        return (

            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">

                <div className="flex justify-center flex-row">
                    <i className="las la-3x la-user" />
                    <span className="mt-1.5 text-lg font-semibold"><h2 className="text-3xl lg:text-4xl font-semibold">
                      Sign up
                </h2></span>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                {errorMessage ? (
                    <span className="text-red-800">

                              <strong>Something went wrong</strong> Please try again.
                      </span>
                ) : null}
                {/* ------------------------ */}
                <form onSubmit={submitForm}>
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Your Details</h3>

                    <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                        <div className="flex-1 p-5 flex space-x-4">
                            {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                            <div className="flex flex-col">
                                <span className="text-sm text-neutral-400">First Name</span>
                                <input
                                    type="text"
                                    className=" w-full p-3 rounded mb-4"
                                    required
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div className="flex-1 p-5 flex space-x-4">
                            {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                            <div className="flex flex-col">
                                <span className="text-sm text-neutral-400">Last Name</span>
                                <input
                                    type="text"
                                    className=" w-full p-3 rounded mb-4"
                                    required
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ------------------------ */}
                <div className="space-y-6">
                    <div className="space-y-1">
                        <Label>Email </Label>
                        <Input type="email" defaultValue="example@gmail.com"
                               name="email"
                               value={email}
                               required
                               onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Password </Label>
                        <Input type="password" defaultValue="***"

                               name="password"
                               value={password}
                               required
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordStrengthBar password={password} />
                    </div>
                    <div className="space-y-1">
                        <Label>Confirmed Password </Label>
                        <Input type="password" defaultValue="***"
                               value={confirmPassword}
                               required
                               onChange={(e) => {
                                    if(password!==e.target.value){
                                        setErrorPassword(true)
                                    }else setErrorPassword(false)
                                   return setConfirmPassword(e.target.value);
                               }}

                        />

                    </div>
                    { errorPassword ?(
                    <div className="space-y-1">
                        <span className="text-sm text-red-800 block">
                             Passwords don't match
                    </span>
                    </div>): (null)
                    }
                    <div className="pt-4">
                        <ButtonPrimary>Register</ButtonPrimary>
                    </div>
                </div>
                </form>
            </div>
        );
    };

    return (
        <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
            <main className="container mt-11 mb-24 lg:mb-32 ">
                {successMessage ? (
                    <div>
                    <span className="flex justify-center  text-purple-800">
                        <h2 className="text-3xl lg:text-4xl font-semibold">
                             Congratulation 🎉  <strong>registration</strong> was successful.
                        </h2>

                      </span>
                    <div className="border-success border-neutral-200 dark:border-neutral-700"></div>
                        <span className="flex justify-center  text-purple-800">
                        <h5 className=" font-semibold">
                            Please check your <strong>email <i className="las la-envelope" /></strong>.
                        </h5>
                        </span>
                    </div>

                ) :  <div className="max-w-4xl mx-auto">{renderContent()}</div>}

            </main>
        </div>
    );
};

export default Signup;
