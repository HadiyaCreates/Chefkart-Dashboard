import { useState } from "react";
import { useDispatch } from "react-redux";

import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TitleCard from "../../../components/Cards/TitleCard";

function ChangePassword() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        mobileNumber: "",
        otp: "",
    });

    const [step, setStep] = useState("changePassword"); // Possible values: changePassword, forgotPassword, verifyOTP, resetPassword
    const [loading, setLoading] = useState(false);

    const updateFormValue = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChangePassword = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            dispatch(showNotification({ message: "Passwords do not match!", status: 0 }));
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatch(showNotification({ message: "Password Changed Successfully", status: 1 }));
        }, 1000);
    };

    const handleForgotPassword = () => {
        if (!formData.mobileNumber) {
            dispatch(showNotification({ message: "Please enter your mobile number!", status: 0 }));
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("verifyOTP");
            dispatch(showNotification({ message: "OTP Sent Successfully", status: 1 }));
        }, 1000);
    };

    const handleVerifyOTP = () => {
        if (!formData.otp) {
            dispatch(showNotification({ message: "Please enter the OTP!", status: 0 }));
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("resetPassword");
            dispatch(showNotification({ message: "OTP Verified Successfully", status: 1 }));
        }, 1000);
    };

    const handleResetPassword = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            dispatch(showNotification({ message: "Passwords do not match!", status: 0 }));
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatch(showNotification({ message: "Password Reset Successfully", status: 1 }));
            setStep("changePassword");
        }, 1000);
    };

    const renderChangePassword = () => (
        <div>
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="grid grid-cols-1 gap-4">
                <InputText
                    labelTitle="Current Password"
                    type="password"
                    value={formData.currentPassword}
                    updateFormValue={(value) => updateFormValue("currentPassword", value)}
                />
                <InputText
                    labelTitle="New Password"
                    type="password"
                    value={formData.newPassword}
                    updateFormValue={(value) => updateFormValue("newPassword", value)}
                />
                <InputText
                    labelTitle="Re-type New Password"
                    type="password"
                    value={formData.confirmPassword}
                    updateFormValue={(value) => updateFormValue("confirmPassword", value)}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    onClick={handleChangePassword}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );

    const renderForgotPassword = () => (
        <div>
            <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
            <div className="grid grid-cols-1 gap-4">
                <InputText
                    labelTitle="Mobile Number"
                    type="tel"
                    value={formData.mobileNumber}
                    updateFormValue={(value) => updateFormValue("mobileNumber", value)}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    onClick={handleForgotPassword}
                >
                    Send OTP
                </button>
            </div>
        </div>
    );

    const renderVerifyOTP = () => (
        <div>
            <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
            <div className="grid grid-cols-1 gap-4">
                <InputText
                    labelTitle="OTP"
                    type="text"
                    value={formData.otp}
                    updateFormValue={(value) => updateFormValue("otp", value)}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    onClick={handleVerifyOTP}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );

    const renderResetPassword = () => (
        <div>
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
            <div className="grid grid-cols-1 gap-4">
                <InputText
                    labelTitle="New Password"
                    type="password"
                    value={formData.newPassword}
                    updateFormValue={(value) => updateFormValue("newPassword", value)}
                />
                <InputText
                    labelTitle="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    updateFormValue={(value) => updateFormValue("confirmPassword", value)}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );

    return (
        <TitleCard title="Change Password" topMargin="mt-2">
            <div className="space-y-8">
                {step === "changePassword" && renderChangePassword()}
                {step === "forgotPassword" && renderForgotPassword()}
                {step === "verifyOTP" && renderVerifyOTP()}
                {step === "resetPassword" && renderResetPassword()}
            </div>
            {step === "changePassword" && (
                <div className="mt-4">
                    <button
                        className="text-blue-600 underline"
                        onClick={() => setStep("forgotPassword")}
                    >
                        Forgot Password?
                    </button>
                </div>
            )}
        </TitleCard>
    );
}

export default ChangePassword;
