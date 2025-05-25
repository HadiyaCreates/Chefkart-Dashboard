import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function InternshipForm() {
   const [internshipData, setInternshipData] = useState([]);

   useEffect(() => {
      fetchInternshipData();
   }, []);

   const fetchInternshipData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/internship/internships");
         setInternshipData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch internship applications", err);
      }
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Internship Applications">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {internshipData.map((intern) => (
                  <div 
                     key={intern._id} 
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     <h3 className="text-lg font-bold text-gray-800">{intern.fullName}</h3>
                     <p className="text-sm text-gray-600 mt-2"><strong>Email:</strong> {intern.email}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Phone:</strong> {intern.phone}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>College:</strong> {intern.college}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Degree:</strong> {intern.degree}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Internship Duration:</strong> {intern.startDate} - {intern.endDate}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Domain:</strong> {intern.internshipDomain}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Project:</strong> {intern.projectTitle}</p>
                     <p className="text-sm text-gray-600 mt-1"><strong>Skills Gained:</strong> {intern.skillsGained.join(", ")}</p>
                  </div>
               ))}
            </div>
         </TitleCard>
      </div>
   );
}

export default InternshipForm;
