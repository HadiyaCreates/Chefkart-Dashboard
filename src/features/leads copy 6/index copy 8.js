import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Homepage() {
   const [blogData, setBlogData] = useState([]);
   const [formData, setFormData] = useState({
      title: "",
      content: "",
      category: "",
      image: "",
   });

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   // editing mode state
   const [isEditMode, setIsEditMode] = useState(false);
   // id of the blog post being edited
   // this will be used to identify which blog post to update
   const [editId, setEditId] = useState(null);

   useEffect(() => {
      fetchBlogData();
   }, []);

   const fetchBlogData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/home/getall");
         setBlogData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch blog data", err);
      }
   };

   const handleDelete = async (blogId) => {
      try {
         await axios.delete(`http://localhost:8000/blog/delete/${blogId}`);
         setBlogData(blogData.filter((blog) => blog._id !== blogId));
      } catch (err) {
         console.error("Failed to delete blog post", err);
      }
   };

   const handleCreateOrUpdate = async () => {
      try {
         if (isEditMode) {
            await axios.put(`http://localhost:8000/blog/update/${editId}`, formData);
         } else {
            await axios.post("http://localhost:8000/home/createHomePage", formData);
         }
         setIsCreateModalOpen(false);
         resetFormData();
         fetchBlogData();
      } catch (err) {
         console.error("Failed to submit blog post", err);
      }
   };

   const resetFormData = () => {
      setFormData({ title: "", content: "", image: "", category: "" });
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
         content: blog.content,
         category: blog.category,
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
         <TitleCard title="Blog Posts">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Blog Post
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {blogData.map((blog) => (
                  <div
                     key={blog._id}
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-md"
                     />
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{blog.title}</h3>
                     <p className="text-sm text-gray-600 mt-2">{blog.content}</p>
                     <p className="text-sm text-gray-600 mt-2">{blog.category}</p>

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
                     {isEditMode ? "Edit Blog Post" : "Add New Blog Post"}
                  </h3>

                  <input
                     type="text"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Title"
                  />

                  <textarea
                     name="content"
                     value={formData.content}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Content"
                  ></textarea>

                  <input
                     type="text"
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Category"
                  />

                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                     className="w-full p-2 border rounded mt-2"
                  />

                  {formData.image && (
                     <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover mt-2 rounded-md"
                     />
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

export default Homepage;