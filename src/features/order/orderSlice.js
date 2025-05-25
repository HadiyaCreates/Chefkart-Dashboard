import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    selectedOrder: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        updateOrder: (state, action) => {
            const index = state.orders.findIndex(o => o._id === action.payload._id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(o => o._id !== action.payload);
        }
    }
});

export const { 
    setOrders, 
    setLoading, 
    setError, 
    setSelectedOrder,
    updateOrder,
    deleteOrder
} = orderSlice.actions;

export default orderSlice.reducer;