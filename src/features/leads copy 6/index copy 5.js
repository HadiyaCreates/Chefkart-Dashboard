import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Crousel() {
   const [carouselData, setCarouselData] = useState([]);
   const [formData, setFormData] = useState({
      title: "",
      content: "",
      image: "",
      action: "",
   });

   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [editId, setEditId] = useState(null);

   useEffect(() => {
      fetchCarouselData();
   }, []);

   const fetchCarouselData = async () => {
      try {
         const response = await axios.get("http://localhost:8000/crousel/get");
         const data = response.data;
         setCarouselData(Array.isArray(data) ? data : []);
      } catch (err) {
         console.error("Failed to fetch carousel data", err);
         setCarouselData([]);
      }
   };

   const handleDelete = async (id) => {
      try {
         await axios.delete(`http://localhost:8000/crousel/delete/${id}`);
         setCarouselData((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
         console.error("Failed to delete carousel item", err);
      }
   };

   const handleCreateOrUpdate = async () => {
      try {
         if (isEditMode) {
            await axios.put(`http://localhost:8000/crousel/update/${editId}`, formData);
         } else {
            await axios.post("http://localhost:8000/crousel/createCrousel", formData);
         }
         setIsCreateModalOpen(false);
         resetFormData();
         fetchCarouselData();
      } catch (err) {
         console.error("Failed to submit carousel item", err);
      }
   };

   const resetFormData = () => {
      setFormData({ title: "", content: "", image: "", action: "" });
      setIsEditMode(false);
      setEditId(null);
   };

   const openCreateModal = () => {
      resetFormData();
      setIsCreateModalOpen(true);
   };

   const openEditModal = (item) => {
      setFormData({
         title: item.title,
         content: item.content,
         image: item.image,
         action: item.action,
      });
      setEditId(item._id);
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
         <TitleCard title="Carousel Items">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Carousel Item
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {carouselData.map((item) => (
                  <div
                     key={item._id}
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     {item.image && (
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-40 object-cover rounded-md"
                        />
                     )}
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{item.title}</h3>
                     <p className="text-sm text-gray-600 mt-2">{item.content}</p>
                     <p className="text-sm text-indigo-600 mt-1 italic">{item.action}</p>

                     <div className="mt-4 flex justify-between">
                        <button
                           onClick={() => openEditModal(item)}
                           className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => handleDelete(item._id)}
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
                     {isEditMode ? "Edit Carousel Item" : "Add New Carousel Item"}
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
                     name="action"
                     value={formData.action}
                     onChange={handleChange}
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Action Text"
                  />
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

export default Crousel;
