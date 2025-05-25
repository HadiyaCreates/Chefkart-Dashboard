import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addGoldProduct, updateGoldProduct, getGoldProductById } from '../../../app/api';
import { addProduct, updateProduct, setError } from '../goldSlice';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';

const GoldProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        weight: '',
        purity: '',
        category: ''
    });

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await getGoldProductById(id);
            if (response.status) {
                const product = response.data;
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    weight: product.weight,
                    purity: product.purity,
                    category: product.category
                });
                setPreviewImages(product.images);
            } else {
                setErrorMessage(response.message || 'Failed to fetch product');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validation
        if (!formData.name.trim()) return setErrorMessage('Name is required');
        if (!formData.price.trim()) return setErrorMessage('Price is required');
        if (!images.length && !id) return setErrorMessage('At least one image is required');

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
        images.forEach(image => {
            submitData.append('images', image);
        });

        setLoading(true);
        try {
            const response = id
                ? await updateGoldProduct(id, submitData)
                : await addGoldProduct(submitData);

            if (response.status) {
                if (id) {
                    dispatch(updateProduct(response.data));
                } else {
                    dispatch(addProduct(response.data));
                }
                navigate('/app/gold');
            } else {
                setErrorMessage(response.message || `Failed to ${id ? 'update' : 'add'} product`);
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
            <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Gold Product</h1>
            
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 gap-6">
                    <InputText
                        type="text"
                        defaultValue={formData.name}
                        updateType="name"
                        labelTitle="Product Name"
                        updateFormValue={updateFormValue}
                    />

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            value={formData.description}
                            onChange={(e) => updateFormValue({
                                updateType: 'description',
                                value: e.target.value
                            })}
                        />
                    </div>

                    <InputText
                        type="number"
                        defaultValue={formData.price}
                        updateType="price"
                        labelTitle="Price (₹)"
                        updateFormValue={updateFormValue}
                    />

                    <InputText
                        type="text"
                        defaultValue={formData.weight}
                        updateType="weight"
                        labelTitle="Weight (g)"
                        updateFormValue={updateFormValue}
                    />

                    <InputText
                        type="text"
                        defaultValue={formData.purity}
                        updateType="purity"
                        labelTitle="Purity"
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
                            <span className="label-text">Product Images</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>

                    {previewImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                            {previewImages.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                            ))}
                        </div>
                    )}

                    <ErrorText>{errorMessage}</ErrorText>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className={"btn btn-primary flex-1" + (loading ? " loading" : "")}
                            disabled={loading}
                        >
                            {id ? 'Update' : 'Add'} Product
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost flex-1"
                            onClick={() => navigate('/app/gold')}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GoldProductForm;