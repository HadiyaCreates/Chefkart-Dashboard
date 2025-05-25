import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function ChefDetails() {
   const [chefs, setChefs] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   useEffect(() => {
      fetchChefs();
   }, []);

   const fetchChefs = async () => {
      try {
         const res = await axios.get("http://localhost:8000/chef/get");
         setChefs(res.data.data || []);
      } catch (err) {
         console.error("Failed to fetch chef data", err);
         setChefs([]);
      }
   };

   // Pagination Logic
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = chefs.slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(chefs.length / itemsPerPage);

   const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Chef Details">
            <div className="overflow-x-auto">
               <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                     <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Experience</th>
                        <th className="px-4 py-2 border">Verified</th>
                        <th className="px-4 py-2 border">Profile</th>
                     </tr>
                  </thead>
                  <tbody>
                     {currentItems.map((chef) => (
                        <tr key={chef._id} className="text-center">
                           <td className="px-4 py-2 border">{chef.name}</td>
                           <td className="px-4 py-2 border">{chef.email}</td>
                           <td className="px-4 py-2 border">{chef.phone}</td>
                           <td className="px-4 py-2 border">
                              {chef.city}, {chef.state}
                           </td>
                           <td className="px-4 py-2 border">{chef.experience}</td>
                           <td className="px-4 py-2 border">
                              {chef.verified ? "Yes" : "No"}
                           </td>
                           <td className="px-4 py-2 border">
                              <img
                                 src={chef.profilepic}
                                 alt="Profile"
                                 className="w-12 h-12 rounded-full mx-auto"
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center gap-2">
               <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
               >
                  Prev
               </button>
               {Array.from({ length: totalPages }, (_, i) => (
                  <button
                     key={i}
                     onClick={() => handlePageChange(i + 1)}
                     className={`px-3 py-1 border rounded ${
                        currentPage === i + 1
                           ? "bg-blue-500 text-white"
                           : "bg-gray-100"
                     }`}
                  >
                     {i + 1}
                  </button>
               ))}
               <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
               >
                  Next
               </button>
            </div>
         </TitleCard>
      </div>
   );
}

export default ChefDetails;
