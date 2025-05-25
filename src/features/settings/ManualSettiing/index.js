import { useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";

function Manual() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        personalInfo: {
            mobileNumber: '',
            firstName: '',
            lastName: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            remark: '',
        },
        businessInfo: {
            companyName: '',
            businessType: '',
            businessMobileNo: '',
            website: '',
        },
        location: {
            country: '',
            state: '',
            city: '',
            address: '',
        },
        documents: {
            aadharCard: null,
            gstin: '',
        },
    });

    const [loading, setLoading] = useState(false);

    const updateFormValue = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleFileChange = (section, field, event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: file,
                },
            }));
        }
    };

    const updateProfile = () => {
        dispatch(showNotification({ message: "Profile Updated", status: 1 }));
    };

    const renderDropdown = (label, options, section, field) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                value={formData[section][field]}
                onChange={(e) => updateFormValue(section, field, e.target.value)}
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <TitleCard title="Register" topMargin="mt-2">
            <div className="space-y-8">
                {/* Personal Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText
                            labelTitle="Mobile Number"
                            type="number"
                            defaultValue={formData.personalInfo.mobileNumber}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "mobileNumber", value)
                            }
                        />
                        <InputText
                            labelTitle="First Name"
                            defaultValue={formData.personalInfo.firstName}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "firstName", value)
                            }
                        />
                        <InputText
                            labelTitle="Last Name"
                            defaultValue={formData.personalInfo.lastName}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "lastName", value)
                            }
                        />
                        <InputText
                            labelTitle="Email ID"
                            type="email"
                            defaultValue={formData.personalInfo.emailId}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "emailId", value)
                            }
                        />
                        <InputText
                            labelTitle="Password"
                            type="password"
                            defaultValue={formData.personalInfo.password}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "password", value)
                            }
                        />
                        <InputText
                            labelTitle="Confirm Password"
                            type="password"
                            defaultValue={formData.personalInfo.confirmPassword}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "confirmPassword", value)
                            }
                        />
                        <InputText
                            labelTitle="Remark"
                            defaultValue={formData.personalInfo.remark}
                            updateFormValue={(value) =>
                                updateFormValue("personalInfo", "remark", value)
                            }
                        />
                    </div>
                </div>

                {/* Business Information Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Business Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText
                            labelTitle="Company Name (Optional)"
                            defaultValue={formData.businessInfo.companyName}
                            updateFormValue={(value) =>
                                updateFormValue("businessInfo", "companyName", value)
                            }
                        />
                        {renderDropdown("Business Type", ["Retail", "Wholesale", "Manufacturing"], "businessInfo", "businessType")}
                        <InputText
                            labelTitle="Business Mobile Number"
                            type="number"
                            defaultValue={formData.businessInfo.businessMobileNo}
                            updateFormValue={(value) =>
                                updateFormValue("businessInfo", "businessMobileNo", value)
                            }
                        />
                        <InputText
                            labelTitle="Website"
                            defaultValue={formData.businessInfo.website}
                            updateFormValue={(value) =>
                                updateFormValue("businessInfo", "website", value)
                            }
                        />
                    </div>
                </div>

                {/* Location Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Location</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderDropdown("Country", ["India", "USA", "UK"], "location", "country")}
                        {renderDropdown("State", ["Jharkhand", "California", "London"], "location", "state")}
                        <InputText
                            labelTitle="City"
                            defaultValue={formData.location.city}
                            updateFormValue={(value) =>
                                updateFormValue("location", "city", value)
                            }
                        />
                        <TextAreaInput
                            labelTitle="Address"
                            defaultValue={formData.location.address}
                            updateFormValue={(value) =>
                                updateFormValue("location", "address", value)
                            }
                        />
                    </div>
                </div>

                {/* Documents Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Aadhar Card Upload (Optional)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                    handleFileChange("documents", "aadharCard", e)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <InputText
                            labelTitle="GSTIN (Optional)"
                            defaultValue={formData.documents.gstin}
                            updateFormValue={(value) =>
                                updateFormValue("documents", "gstin", value)
                            }
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        className={`btn btn-primary ${loading ? "loading" : ""}`}
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => {
                                setLoading(false);
                                updateProfile();
                            }, 1000);
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </TitleCard>
    );
}

export default Manual;
