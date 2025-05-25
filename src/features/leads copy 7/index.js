import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function ServiceList() {
   const [services, setServices] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedService, setSelectedService] = useState(null);
   const [formData, setFormData] = useState({ name: "", category: "", description: "", image: "", file: "" });
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

   const servicesPerPage = 6;

   useEffect(() => {
      fetchServices();
   }, []);

   const fetchServices = async () => {
      try {
         const response = await axios.get("http://localhost:8000/product/Product");
         setServices(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch services", err);
      }
   };

   const handleDelete = async (serviceId) => {
      try {
         await axios.delete(`http://localhost:8000/product/${serviceId}`);
         setServices(services.filter((service) => service._id !== serviceId));
      } catch (err) {
         console.error("Failed to delete service", err);
      }
   };

   const handleEdit = (service) => {
      setSelectedService(service);
      setFormData({
         name: service.name,
         category: service.category,
         image: service.image,
         file: "",
         description: service.description,
      });
   };

   const handleUpdate = async () => {
      try {
         const updateData = new FormData();
         updateData.append("name", formData.name);
         updateData.append("category", formData.category);
         updateData.append("description", formData.description);
         updateData.append("image", formData.image);
         if (formData.file instanceof File) updateData.append("file", formData.file);

         await axios.put(`http://localhost:8000/product/${selectedService._id}`, updateData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         setSelectedService(null);
         fetchServices();
      } catch (err) {
         console.error("Failed to update service", err);
      }
   };

   const handleCreate = async () => {
      try {
         const createData = new FormData();
         createData.append("name", formData.name);
         createData.append("category", formData.category);
         createData.append("description", formData.description);
         createData.append("image", formData.image);
         if (formData.file instanceof File) createData.append("file", formData.file);

         await axios.post("http://localhost:8000/product/create", createData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         setIsCreateModalOpen(false);
         resetFormData();
         fetchServices();
      } catch (err) {
         console.error("Failed to create service", err);
      }
   };

   const resetFormData = () => {
      setFormData({ name: "", category: "", description: "", image: "", file: "" });
   };

   const openCreateModal = () => {
      resetFormData();
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

   const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         setFormData((prev) => ({ ...prev, file }));
      }
   };

   const downloadHTML = async (id, name) => {
      try {
         const response = await axios.get(`http://localhost:8000/product/download/${id}`, {
            responseType: 'blob'
         });

         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', `${name}.html`);
         document.body.appendChild(link);
         link.click();
         link.remove();
      } catch (err) {
         console.error("Download failed", err);
      }
   };

   const indexOfLastService = currentPage * servicesPerPage;
   const indexOfFirstService = indexOfLastService - servicesPerPage;
   const currentServices = services.slice(indexOfFirstService, indexOfLastService);

   const ServiceFormModal = ({ title, onSubmit, onCancel, isOpen }) => {
      if (!isOpen) return null;

      return (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
               <h3 className="text-lg font-bold text-gray-800">{title}</h3>
               <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-2 p-2 border rounded" placeholder="Service Name" />
               <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full mt-2 p-2 border rounded" placeholder="Category" />
               <textarea name="description" value={formData.description} onChange={handleChange} className="w-full mt-2 p-2 border rounded" placeholder="Description"></textarea>
               <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded mt-2" />
               <input type="file" accept=".html" onChange={handleFileUpload} className="w-full p-2 border rounded mt-2" />
               {formData.image && <img src={formData.image} alt="Service Preview" className="w-full h-32 object-cover mt-2 rounded-md" />}
               <div className="mt-4 flex justify-between">
                  <button onClick={onSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
                  <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Product List">
            <div className="mb-6">
               <button onClick={openCreateModal} className="px-4 py-2 bg-green-500 text-white rounded-md">Add New Products</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {currentServices.map((service) => (
                  <div key={service._id} className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all">
                     <img src={service.image} alt={service.name} className="w-full h-40 object-cover rounded-md" />
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{service.name}</h3>
                     <p className="text-sm text-gray-600"><strong>Category:</strong> {service.category}</p>
                     <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                     <div className="flex gap-4 mt-2">
                        <button
                           onClick={() => downloadHTML(service._id, service.name)}
                           className="text-blue-600 hover:underline"
                        >
                           Download HTML
                        </button>
                        <button
                           onClick={() => {
                              window.open(`http://localhost:8000/product/download/${service._id}`, "_blank");
                           }}
                           className="text-green-600 hover:underline"
                        >
                           View HTML
                        </button>
                     </div>
                     <div className="mt-4 flex justify-between">
                        <button onClick={() => handleEdit(service)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
                        <button onClick={() => handleDelete(service._id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                     </div>
                  </div>
               ))}
            </div>

            <div className="flex justify-between items-center mt-6">
               <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Previous</button>
               <span className="text-gray-700">Page {currentPage}</span>
               <button onClick={() => setCurrentPage((prev) => (indexOfLastService < services.length ? prev + 1 : prev))} disabled={indexOfLastService >= services.length} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Next</button>
            </div>
         </TitleCard>

         <ServiceFormModal title="Add New Product" onSubmit={handleCreate} onCancel={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} />
         <ServiceFormModal title="Edit Product" onSubmit={handleUpdate} onCancel={() => setSelectedService(null)} isOpen={!!selectedService} />
      </div>
   );
}

export default ServiceList;
