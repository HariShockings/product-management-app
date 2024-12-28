import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '' });
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(''); 
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc'); 

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories'); 
            setCategories(response.data);
        } catch (error) {
            alertify.error('Failed to fetch categories.');
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { search, minPrice, maxPrice, sortOrder, category: categoryFilter },
            });
            setProducts(response.data);
        } catch (error) {
            alertify.error('Failed to fetch products.');
        }
    }, [search, minPrice, maxPrice, sortOrder, categoryFilter]);

    useEffect(() => {
        fetchCategories(); // Fetch categories when component mounts
    }, [fetchCategories]);

    useEffect(() => {
        fetchProducts(); // Fetch products whenever filters change
    }, [fetchProducts]);

    const validateInput = () => {
        const { name, price, description } = newProduct;
        if (!name.trim() || !price.trim() || !description.trim()) {
            alertify.error('All fields are required.');
            return false;
        }
        if (isNaN(price) || parseFloat(price) <= 0) {
            alertify.error('Price must be a valid positive number.');
            return false;
        }
        return true;
    };

    const addProduct = async () => {
        if (!validateInput()) return;
    
        try {
            const productToSave = { ...newProduct }; // Ensure this includes the updated category
    
            if (editingProduct) {
                // Ensure the category is correctly included when updating
                await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, productToSave);
                alertify.success('Product updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/products', productToSave);
                alertify.success('Product added successfully.');
            }
    
            fetchProducts();
            setNewProduct({ name: '', price: '', description: '', category: '' });
            setEditingProduct(null);
        } catch (error) {
            alertify.error('Failed to save product.');
        }
    };
    

    const deleteProduct = (id) => {
        alertify.confirm(
            'Confirm Delete',
            'Are you sure you want to delete this product?',
            async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/products/${id}`);
                    alertify.success('Product deleted successfully.');
                    fetchProducts();
                } catch (error) {
                    alertify.error('Failed to delete product.');
                }
            },
            () => {
                alertify.error('Delete operation canceled.');
            }
        );
    };

    const startEditing = (product) => {
        setNewProduct({ name: product.name, price: product.price, description: product.description, category: product.category });
        setEditingProduct(product);
    };

    const handleSortToggle = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value || '');
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container-fluid ml-5">
            <h1 className="my-4">Product Management Dashboard</h1>
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or description"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Min Price"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Max Price"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                <select
                                    className="form-control"
                                    value={categoryFilter}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.category} value={category.category}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                <div className="col-md-1">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleSortToggle}
                                    >
                                        {sortOrder === 'asc' ? 'ASC' : 'DESC'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() => startEditing(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between my-3">
                        <button
                            className="btn btn-outline-primary"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            className="btn btn-outline-primary"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card mt-4 mt-md-0">
                        <div className="card-header bg-primary text-white">
                            {editingProduct ? 'Update Product' : 'Add Product'}
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    rows="5"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="form-control"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.category}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary w-100" onClick={addProduct}>
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                                {editingProduct && (
                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={() => {
                                            setEditingProduct(null);
                                            setNewProduct({ name: '', price: '', description: '', category: '' });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDashboard;
