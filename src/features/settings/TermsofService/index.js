import { useState } from "react";

function TermsOfService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTerm, setNewTerm] = useState("");
    const [terms, setTerms] = useState([
        "You must use our services in compliance with all applicable laws and regulations.",
        "You are responsible for maintaining the confidentiality of your account and password."
    ]);

    // Handle adding a new term
    const addNewTerm = () => {
        if (newTerm.trim() !== "") {
            setTerms([...terms, newTerm]);
            setNewTerm("");
            setIsModalOpen(false);
        }
    };

    return (
        <div className="border-2 border-red-500 p-6 rounded-lg relative mt-6 mx-6 shadow-lg bg-white">
            {/* Title Section */}
            <div className="absolute top-0 left-0 bg-white px-4 py-1 -mt-5 ml-4 border border-red-500 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">Terms & Conditions</h2>
            </div>

            {/* Update Button */}
            <div className="absolute top-0 right-0 bg-white px-4 py-1 -mt-5 mr-4 border border-red-500 rounded-lg shadow-md">
                <button className="text-blue-600 font-semibold">Update</button>
            </div>

            {/* Content Section */}
            <div className="mt-6 px-4 py-6">
                <p className="mb-4 text-gray-700">
                    By using our services, you agree to the following terms and conditions. Please read them carefully.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">Use of Services</h3>
                <ul className="list-disc ml-6 mb-4 text-gray-800">
                    {terms.map((term, index) => (
                        <li key={index} className="mb-2">{term}</li>
                    ))}
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">Prohibited Activities</h3>
                <p className="mb-4 text-gray-700">
                    You agree not to engage in any activities that may harm our services or interfere with other users.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">Intellectual Property</h3>
                <p className="mb-4 text-gray-700">
                    All content provided through our services is the property of our company and is protected by intellectual property laws.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">Termination</h3>
                <p className="mb-4 text-gray-700">
                    We reserve the right to terminate or suspend your access to our services if you violate these terms.
                </p>

                <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">Contact Us</h3>
                <p className="text-gray-700">
                    If you have any questions, please contact us at:
                    <br />
                    Email: <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a>
                    <br />
                    Phone: +1-234-567-890
                </p>
            </div>

            {/* Add New Terms Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 shadow-md hover:bg-blue-600 transition"
            >
                Add Terms & Conditions
            </button>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Term</h3>
                        <textarea
                            className="w-full border p-2 rounded-lg mb-4"
                            placeholder="Enter new term..."
                            value={newTerm}
                            onChange={(e) => setNewTerm(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                onClick={addNewTerm}
                            >
                                Add
                            </button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TermsOfService;
