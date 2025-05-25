import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOrders, setLoading, setError } from '../orderSlice';
import { getAllOrders, deleteOrder, updateOrder } from '../../../app/api';

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, loading, error } = useSelector((state) => state.order);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllOrders();
            if (response.status) {
                dispatch(setOrders(response.data));
            } else {
                dispatch(setError(response.message || 'Failed to fetch orders'));
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
            const response = await deleteOrder(id);
            if (response.status) {
                fetchOrders(); // Refresh the list
                setDeleteConfirmation(null);
            } else {
                dispatch(setError(response.message || 'Failed to delete order'));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            dispatch(setLoading(true));
            const response = await updateOrder(id, { status: newStatus });
            if (response.status) {
                fetchOrders(); // Refresh the list
            } else {
                dispatch(setError(response.message || 'Failed to update order status'));
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
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.products.length} items</td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-info mr-2"
                                        onClick={() => navigate(`/app/orders/${order._id}`)}
                                    >
                                        View
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-error"
                                        onClick={() => setDeleteConfirmation(order._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this order?</p>
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

export default OrderList;