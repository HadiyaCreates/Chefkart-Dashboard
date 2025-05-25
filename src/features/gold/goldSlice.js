import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null
};

const goldSlice = createSlice({
    name: 'gold',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload);
        }
    }
});

export const { 
    setProducts, 
    setLoading, 
    setError, 
    setSelectedProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = goldSlice.actions;

export default goldSlice.reducer;