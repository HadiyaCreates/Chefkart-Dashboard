import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import LandingIntro from './LandingIntro';
import { forgotPassword } from '../../app/api';

function ForgotPassword() {
    const INITIAL_USER_OBJ = {
        emailId: ''
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [linkSent, setLinkSent] = useState(false);
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (userObj.emailId.trim() === '') return setErrorMessage('Email Id is required!');

        setLoading(true);
        try {
            const response = await forgotPassword(userObj.emailId);
            if (response.status) {
                setLinkSent(true);
            } else {
                setErrorMessage(response.message || 'Failed to send reset link');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setUserObj({ ...userObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>

                        {linkSent && (
                            <>
                                <div className='text-center mt-8'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='inline-block w-32 text-success' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className='my-4 text-xl font-bold text-center'>Reset Link Sent</p>
                                <p className='mt-4 mb-8 font-semibold text-center'>Please check your email to reset your password</p>
                                <div className='text-center mt-4'>
                                    <Link to="/">
                                        <button className="btn btn-block btn-primary">Back to Login</button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {!linkSent && (
                            <>
                                <p className='my-8 font-semibold text-center'>Enter your email address to receive a password reset link</p>
                                <form onSubmit={submitForm}>
                                    <div className="mb-4">
                                        <InputText
                                            type="email"
                                            defaultValue={userObj.emailId}
                                            updateType="emailId"
                                            containerStyle="mt-4"
                                            labelTitle="Email Address"
                                            updateFormValue={updateFormValue}
                                        />
                                    </div>

                                    <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                                    <button
                                        type="submit"
                                        className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                                    >
                                        Send Reset Link
                                    </button>

                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="btn mt-2 w-full btn-ghost"
                                        >
                                            Back to Login
                                        </button>
                                    </Link>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;