import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    feedback: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Limit the feedback input to 200 words
    if (name === "feedback") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 200) {
        alert("Feedback should not exceed 200 words.");
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validation for feedback
    if (!formData.feedback.trim()) {
      alert("Please provide your feedback.");
      return;
    }

    console.log("Feedback Submitted: ", formData);
    // Perform submission actions here, e.g., dispatching to the store or API call
  };

  return (
    <TitleCard title="Feedback Form">
      <div className="space-y-4">
        {/* Feedback Input */}
        <InputText
          labelTitle="How can we improve VisitingBook?"
          placeholder="Write your feedback here (200 words max)"
          name="feedback"
          row="10" // You can adjust this to increase the number of visible rows
          value={formData.feedback}
          updateFormValue={handleInputChange}
          multiline
          className="resize-none h-48 w-full" // Add custom Tailwind CSS classes here for size
        />

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

export default FeedbackForm;
