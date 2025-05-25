import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Testimonial() {
   const [blogData, setBlogData] = useState([]);
   const [formData, setFormData] = useState({
      name: "",
      content: "",
      profileimage: "",
   });

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [editId, setEditId] = useState(null);

   useEffect(() => {
      fetchBlogData();
   }, []);

   const fetchBlogData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/testimonial/get");
         const testimonials = response.data.data;
         setBlogData(Array.isArray(testimonials) ? testimonials : []);
      } catch (err) {
         console.error("Failed to fetch testimonial data", err);
      }
   };

   const handleDelete = async (id) => {
      try {
         await axios.delete(`http://localhost:8000/testimonial/delete/${id}`);
         setBlogData((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
         console.error("Failed to delete testimonial", err);
      }
   };

   const handleCreateOrUpdate = async () => {
      try {
         if (isEditMode) {
            await axios.put(`http://localhost:8000/testimonial/update/${editId}`, formData);
         } else {
            await axios.post("http://localhost:8000/testimonial/createTestimonial", formData);
         }
         setIsCreateModalOpen(false);
         resetFormData();
         fetchBlogData();
      } catch (err) {
         console.error("Failed to submit testimonial", err);
      }
   };

   const resetFormData = () => {
      setFormData({ name: "", content: "", profileimage: "" });
      setIsEditMode(false);
      setEditId(null);
   };

   const openCreateModal = () => {
      resetFormData();
      setIsCreateModalOpen(true);
   };

   const openEditModal = (blog) => {
      setFormData({
         name: blog.name,
         content: blog.content,
         profileimage: blog.profileimage,
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
         setFormData((prev) => ({ ...prev, profileimage: response.data.secure_url }));
      } catch (err) {
         console.error("Image upload failed", err);
      }
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Testimonial Posts">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Testimonial
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {blogData.map((blog) => (
                  <div
                     key={blog._id}
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     {blog.profileimage && (
                        <img
                           src={blog.profileimage}
                           alt={blog.name}
                           className="w-full h-40 object-cover rounded-md"
                        />
                     )}
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{blog.name}</h3>
                     <p className="text-sm text-gray-600 mt-2">{blog.content}</p>

                     <div className="mt-4 flex justify-between">
                        <button
                           onClick={() => openEditModal(blog)}
                           className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleDelete(blog._id)}
                           className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </TitleCard>

         {isCreateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                     {isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
                  </h3>

                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Name"
                  />

                  <textarea
                     name="content"
                     value={formData.content}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Content"
                  ></textarea>

                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                     className="w-full p-2 border rounded mt-2"
                  />

                  {formData.profileimage && (
                     <div className="mt-2">
                        <img
                           src={formData.profileimage}
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

export default Testimonial;
