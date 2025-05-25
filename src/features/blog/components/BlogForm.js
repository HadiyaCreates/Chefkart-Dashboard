import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog, getBlogById } from '../../../app/api';
import { addBlog, updateBlog as updateBlogAction, setError } from '../blogSlice';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';

const BlogForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        category: ''
    });

    useEffect(() => {
        if (id) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await getBlogById(id);
            if (response.status) {
                const blog = response.data;
                setFormData({
                    title: blog.title,
                    content: blog.content,
                    author: blog.author,
                    category: blog.category
                });
                setPreviewImage(blog.image);
            } else {
                setErrorMessage(response.message || 'Failed to fetch blog');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validation
        if (!formData.title.trim()) return setErrorMessage('Title is required');
        if (!formData.content.trim()) return setErrorMessage('Content is required');
        if (!image && !id) return setErrorMessage('Image is required');

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        if (image) {
            submitData.append('image', image);
        }

        setLoading(true);
        try {
            const response = id
                ? await updateBlog(id, submitData)
                : await createBlog(submitData);

            if (response.status) {
                if (id) {
                    dispatch(updateBlogAction(response.data));
                } else {
                    dispatch(addBlog(response.data));
                }
                navigate('/app/blog');
            } else {
                setErrorMessage(response.message || `Failed to ${id ? 'update' : 'create'} blog`);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setFormData({ ...formData, [updateType]: value });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Create'} Blog Post</h1>
            
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 gap-6">
                    <InputText
                        type="text"
                        defaultValue={formData.title}
                        updateType="title"
                        labelTitle="Blog Title"
                        updateFormValue={updateFormValue}
                    />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Content</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-32"
                            value={formData.content}
                            onChange={(e) => updateFormValue({
                                updateType: 'content',
                                value: e.target.value
                            })}
                        />
                    </div>

                    <InputText
                        type="text"
                        defaultValue={formData.author}
                        updateType="author"
                        labelTitle="Author"
                        updateFormValue={updateFormValue}
                    />

                    <InputText
                        type="text"
                        defaultValue={formData.category}
                        updateType="category"
                        labelTitle="Category"
                        updateFormValue={updateFormValue}
                    />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Blog Image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {previewImage && (
                        <div className="w-full">
                            <img
                                src={previewImage}
                                alt="Blog preview"
                                className="w-full max-h-64 object-cover rounded"
                            />
                        </div>
                    )}

                    <ErrorText>{errorMessage}</ErrorText>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className={"btn btn-primary flex-1" + (loading ? " loading" : "")}
                            disabled={loading}
                        >
                            {id ? 'Update' : 'Create'} Blog
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost flex-1"
                            onClick={() => navigate('/app/blog')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;