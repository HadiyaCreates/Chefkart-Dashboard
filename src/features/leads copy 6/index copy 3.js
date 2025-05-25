import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Gallery() {
   const [blogData, setBlogData] = useState([]);
   const [formData, setFormData] = useState({
      name: "",
      content: "",
      galleryImages: [],
   });

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [editId, setEditId] = useState(null);

   useEffect(() => {
      fetchBlogData();
   }, []);

   const fetchBlogData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/gallery/get");
         setBlogData(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch blog data", err);
      }
   };

   const handleDelete = async (blogId) => {
      try {
         await axios.delete("http://localhost:8000/gallery/delete");
         setBlogData(blogData.filter((blog) => blog._id !== blogId));
      } catch (err) {
         console.error("Failed to delete blog post", err);
      }
   };

   const handleCreateOrUpdate = async () => {
      try {
         if (isEditMode) {
            await axios.put(`http://localhost:8000/gallery/update/${editId}`, formData);
         } else {
            await axios.post("http://localhost:8000/gallery//createGallery", formData);
         }
         setIsCreateModalOpen(false);
         resetFormData();
         fetchBlogData();
      } catch (err) {
         console.error("Failed to submit blog post", err);
      }
   };

   const resetFormData = () => {
      setFormData({ name: "", content: "", galleryImages: [] });
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
         galleryImages: blog.galleryImages || [],
      });
      setEditId(blog._id);
      setIsEditMode(true);
      setIsCreateModalOpen(true);
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleImageUpload = async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const uploadedUrls = [];

      for (const file of files) {
         const imageData = new FormData();
         imageData.append("file", file);
         imageData.append("upload_preset", "marketdata");

         try {
            const response = await axios.post(
               "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload",
               imageData
            );
            uploadedUrls.push(response.data.secure_url);
         } catch (err) {
            console.error("Image upload failed", err);
         }
      }

      setFormData((prev) => ({
         ...prev,
         galleryImages: [...prev.galleryImages, ...uploadedUrls],
      }));
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Gallery Posts">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Gallery
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {blogData.map((blog) => (
                  <div
                     key={blog._id}
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     {blog.galleryImages?.length > 0 && (
                        <img
                           src={blog.galleryImages[0]}
                           alt={blog.title}
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
                     {isEditMode ? "Edit Gallery Post" : "Add New Gallery Post"}
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
                     multiple
                  />

                  <div className="flex gap-2 mt-2 overflow-x-auto">
                     {formData.galleryImages.map((img, idx) => (
                        <img
                           key={idx}
                           src={img}
                           alt={`Preview ${idx}`}
                           className="w-20 h-20 object-cover rounded"
                        />
                     ))}
                  </div>

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

export default Gallery;