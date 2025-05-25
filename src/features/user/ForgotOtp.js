import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import LandingIntro from './LandingIntro';
import { forgotPassword } from '../../app/api';
import { CheckCircleIcon } from '@heroicons/react/solid';

function ForgotPasswordOTP() {
    const INITIAL_USER_OBJ = {
        emailId: '',
        otp: ''
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [stage, setStage] = useState('email');
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

    const submitEmailForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (userObj.emailId.trim() === '') return setErrorMessage('Email Id is required!');

        setLoading(true);
        try {
            const response = await forgotPassword(userObj.emailId);
            if (response.status) {
                setStage('otp');
            } else {
                setErrorMessage(response.message || 'Failed to send OTP');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (userObj.otp.trim() === '') return setErrorMessage('OTP is required!');

        // Navigate to reset password page with OTP
        navigate('/reset-password', { state: { otp: userObj.otp } });
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setUserObj({ ...userObj, [updateType]: value });
    };

    const renderEmailStage = () => (
        <form onSubmit={submitEmailForm}>
            <p className='my-8 font-semibold text-center'>
                We will send a 6-digit OTP to your email
            </p>
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

            <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
            <button
                type="submit"
                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
            >
                Send OTP
            </button>
        </form>
    );

    const renderOTPStage = () => (
        <form onSubmit={verifyOTP}>
            <p className='my-8 font-semibold text-center'>
                Enter the 6-digit OTP sent to {userObj.emailId}
            </p>
            <div className="mb-4">
                <InputText
                    type="text"
                    defaultValue={userObj.otp}
                    updateType="otp"
                    containerStyle="mt-4"
                    labelTitle="Enter OTP"
                    updateFormValue={updateFormValue}
                    maxLength={6}
                />
            </div>

            <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
            <button
                type="submit"
                className="btn mt-2 w-full btn-primary"
            >
                Verify OTP
            </button>

            <div className='text-center mt-4'>
                <button
                    type="button"
                    onClick={submitEmailForm}
                    className="text-primary"
                >
                    Resend OTP
                </button>
            </div>
        </form>
    );

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>
                            Forgot Password (OTP Verify)
                        </h2>

                        {stage === 'email' && renderEmailStage()}
                        {stage === 'otp' && renderOTPStage()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordOTP;
