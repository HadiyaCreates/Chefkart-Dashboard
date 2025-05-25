import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../goldSlice';
import { getAllGoldProducts, deleteGoldProduct } from '../../../app/api';

const GoldProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.gold);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllGoldProducts();
            if (response.status) {
                dispatch(setProducts(response.data));
            } else {
                dispatch(setError(response.message || 'Failed to fetch products'));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDelete = async (id) => {
        try {
            dispatch(setLoading(true));
            const response = await deleteGoldProduct(id);
            if (response.status) {
                fetchProducts(); // Refresh the list
                setDeleteConfirmation(null);
            } else {
                dispatch(setError(response.message || 'Failed to delete product'));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gold Products</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/app/gold/add')}
                >
                    Add New Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">
                                    ₹{product.price}
                                </span>
                                <div className="card-actions justify-end">
                                    <button 
                                        className="btn btn-sm btn-info"
                                        onClick={() => navigate(`/app/gold/edit/${product._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-error"
                                        onClick={() => setDeleteConfirmation(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button 
                                className="btn btn-ghost"
                                onClick={() => setDeleteConfirmation(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-error"
                                onClick={() => handleDelete(deleteConfirmation)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoldProductList;