import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import DateRangePicker from "../../components/DataPicker";

function RequestDemo() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        callDate: "",
        callTime: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Add form validation logic
        if (!formData.name || !formData.phone || !formData.callDate || !formData.callTime) {
            alert("Please fill out all required fields.");
            return;
        }

        console.log("Form Submitted: ", formData);
        // Perform submission actions here, e.g., dispatching to the store or API call
    };

    return (
        <TitleCard title="Request Callback">
            <div className="space-y-4">
                {/* Name Input */}
                <InputText
                    labelTitle="Name"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    updateFormValue={handleInputChange}
                />
                {/* Phone Input */}
                <InputText
                    labelTitle="Phone"
                    placeholder="Enter your phone number"
                    name="phone"
                    type="number"
                    value={formData.phone}
                    updateFormValue={handleInputChange}
                />
                {/* Date Picker */}
                <DateRangePicker
                    labelTitle="When to call?"
                    placeholder="Select a date"
                    name="callDate"
                    value={formData.callDate}
                    updateFormValue={handleInputChange}
                />
                {/* Time Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <select
                        className="select select-bordered w-full"
                        name="callTime"
                        value={formData.callTime}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                    </select>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        className="btn btn-sm btn-primary mt-4"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </TitleCard>
    );
}

export default RequestDemo;
