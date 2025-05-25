import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ labelTitle, updateFormValue }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        updateFormValue({ start, end });
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{labelTitle}</label>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Select date range"
                className="input input-bordered w-full"
            />
        </div>
    );
};

// Export the component
export default DateRangePicker;
