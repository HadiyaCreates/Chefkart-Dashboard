import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],
    loading: false,
    error: null,
    selectedBlog: null
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedBlog: (state, action) => {
            state.selectedBlog = action.payload;
        },
        addBlog: (state, action) => {
            state.blogs.push(action.payload);
        },
        updateBlog: (state, action) => {
            const index = state.blogs.findIndex(b => b._id === action.payload._id);
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter(b => b._id !== action.payload);
        }
    }
});

export const { 
    setBlogs, 
    setLoading, 
    setError, 
    setSelectedBlog,
    addBlog,
    updateBlog,
    deleteBlog
} = blogSlice.actions;

export default blogSlice.reducer;