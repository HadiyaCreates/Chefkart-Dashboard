import { useState } from "react";

import TextAreaInput from "../../components/Input/TextAreaInput";
import InputText from "../../components/Input/InputText";
import TitleCard from "../../components/Cards/TitleCard";

function Address() {
    const [formData, setFormData] = useState({
        location: {
            country: '',
            state: '',
            city: '',
            fullAddress: '',
        },
    });

    const updateFormValue = (field, value) => {
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [field]: value,
            },
        }));
    };

    const renderLocationFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country Dropdown */}
            <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                    value={formData.location.country}
                    onChange={(e) => updateFormValue('country', e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>

            {/* State Dropdown */}
            <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <select
                    value={formData.location.state}
                    onChange={(e) => updateFormValue('state', e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                </select>
            </div>

            {/* City Input */}
            <InputText
                labelTitle="City"
                defaultValue={formData.location.city}
                updateFormValue={(value) => updateFormValue('city', value)}
            />

            {/* Full Address Input */}
            <TextAreaInput
                labelTitle="Full Address"
                defaultValue={formData.location.fullAddress}
                updateFormValue={(value) => updateFormValue('fullAddress', value)}
            />
        </div>
    );

    return (
        <TitleCard title="Address Details" topMargin="mt-2">
            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Location</h2>
                    {renderLocationFields()}
                </div>

                <div className="flex justify-end">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            console.log("Form Data:", formData);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </TitleCard>
    );
}

export default Address;
