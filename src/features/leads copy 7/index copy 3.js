import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function InvestorList() {
   const [blogData, setBlogData] = useState([]);
   const [formData, setFormData] = useState({
      title: "",
      subtitle: "",
      description: "",
      image: "",
   });

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [editId, setEditId] = useState(null);

   useEffect(() => {
      fetchBlogData();
   }, []);

   const fetchBlogData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/investor/getinvestor");
         const investors = response.data
         console.log(investors);
         setBlogData(Array.isArray(investors) ? investors : []);
      } catch (err) {
         console.error("Failed to fetch investor data", err);
      }
   };


   const handleCreateOrUpdate = async () => {
      try {
         if (isEditMode) {
            await axios.put(`http://localhost:8000/testimonial/update/${editId}`, formData);
         } else {
            await axios.post("http://localhost:8000/investor/createInvestor", formData);
         }
         setIsCreateModalOpen(false);
         resetFormData();
         fetchBlogData();
      } catch (err) {
         console.error("Failed to submit investor", err);
      }
   };

   const resetFormData = () => {
      setFormData({ title: "", subtitle: "", description: "", image: "" });
      setIsEditMode(false);
      setEditId(null);
   };

   const openCreateModal = () => {
      resetFormData();
      setIsCreateModalOpen(true);
   };

   const openEditModal = (blog) => {
      setFormData({
         title: blog.title,
         subtitle: blog.subtitle,
         description: blog.description,
         image: blog.image,
      });

      setEditId(blog._id);
      setIsEditMode(true);
      setIsCreateModalOpen(true);
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "marketdata");

      try {
         const response = await axios.post(
            "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload",
            imageData
         );
         setFormData((prev) => ({ ...prev, image: response.data.secure_url }));
      } catch (err) {
         console.error("Image upload failed", err);
      }
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Investor List">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Investor
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {blogData.map((blog) => (
                  <div
                     key={blog._id}
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     {blog.image && (
                        <img
                           src={blog.image}
                           alt={blog.title}
                           className="w-full h-40 object-cover rounded-md"
                        />
                     )}
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{blog.title}</h3>
                     <p className="text-sm text-gray-600 mt-2">{blog.subtitle}</p>
                     <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
                     <div className="mt-4 flex justify-between">
                      
                     </div>
                  </div>
               ))}
            </div>
         </TitleCard>

         {isCreateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                     {isEditMode ? "Edit Investor" : "Add New Investor"}
                  </h3>

                  <input
                     type="text"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Investor Name/Title"
                  />

                  <textarea
                     name="subtitle"
                     value={formData.subtitle}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Subtitle"
                  ></textarea>

                  <textarea
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Description"
                  ></textarea>

                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                     className="w-full p-2 border rounded mt-2"
                  />

                  {formData.image && (
                     <div className="mt-2">
                        <img
                           src={formData.image}
                           alt="Preview"
                           className="w-20 h-20 object-cover rounded"
                        />
                     </div>
                  )}

                  <div className="mt-4 flex justify-between">
                     <button
                        onClick={handleCreateOrUpdate}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                     >
                        {isEditMode ? "Update" : "Save"}
                     </button>
                     <button
                        onClick={() => {
                           setIsCreateModalOpen(false);
                           resetFormData();
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default InvestorList;
