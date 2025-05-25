import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import LandingIntro from './LandingIntro';
import { resetPassword } from '../../app/api';

function ResetPassword() {
    const INITIAL_USER_OBJ = {
        otp: '',
        password: '',
        confirmPassword: ''
    };

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (userObj.otp.trim() === '') return setErrorMessage('OTP is required!');
        if (userObj.password.trim() === '') return setErrorMessage('New Password is required!');
        if (userObj.confirmPassword.trim() === '') return setErrorMessage('Confirm Password is required!');
        if (userObj.password !== userObj.confirmPassword) return setErrorMessage('Passwords do not match!');

        setLoading(true);
        try {
            const response = await resetPassword(userObj.otp, userObj.password);
            if (response.status) {
                navigate('/');
            } else {
                setErrorMessage(response.message || 'Failed to reset password');
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
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Reset Password</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    type="text"
                                    defaultValue={userObj.otp}
                                    updateType="otp"
                                    containerStyle="mt-4"
                                    labelTitle="Enter OTP"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    type="password"
                                    defaultValue={userObj.password}
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="New Password"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    type="password"
                                    defaultValue={userObj.confirmPassword}
                                    updateType="confirmPassword"
                                    containerStyle="mt-4"
                                    labelTitle="Confirm Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                            >
                                Reset Password
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;