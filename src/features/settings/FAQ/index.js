import { useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

function FAQPage() {
    const [faqData, setFaqData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");

    const handleAddFAQ = () => {
        if (newQuestion && newAnswer) {
            const newFAQ = { question: newQuestion, answer: newAnswer };
            setFaqData([...faqData, newFAQ]);
            setShowPopup(false);
            setNewQuestion("");
            setNewAnswer("");
        }
    };

    return (
        <>
            <TitleCard title="Frequently Asked Questions" topMargin="mt-2">
                <div className="px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setShowPopup(true)}
                    >
                        Add FAQ
                    </button>
                </div>
                <div className="px-6 py-4">
                    {faqData.length > 0 ? (
                        <ul className="list-disc ml-6">
                            {faqData.map((faq, index) => (
                                <li key={index} className="mb-4">
                                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No FAQs available.</p>
                    )}
                </div>
            </TitleCard>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add a New FAQ</h2>
                        <input 
                            type="text" 
                            placeholder="Write your question" 
                            value={newQuestion} 
                            onChange={(e) => setNewQuestion(e.target.value)} 
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input 
                            type="text" 
                            placeholder="Answer" 
                            value={newAnswer} 
                            onChange={(e) => setNewAnswer(e.target.value)} 
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleAddFAQ}
                        >
                            Submit
                        </button>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FAQPage;
