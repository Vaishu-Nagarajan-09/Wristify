import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(false);
    const [productError, setProductError] = useState("");

    const [showProductForm, setShowProductForm] = useState(false);
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        brand: "",
        price: "",
        description: "",
        image: "",
        stock: "",
        rating: ""
    });

    const [addProductLoading, setAddProductLoading] = useState(false);
    const [addProductError, setAddProductError] = useState("");

    const [editingProductId, setEditingProductId] = useState(null);

    const handleEditProduct = (product) => {

        setEditingProductId(product._id);

        setProductData({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            description: product.description,
            image: product.image,
            stock: product.stock,
            rating: product.rating
        });

        setShowProductForm(true);
    };

    const handleProductChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }

    const handleSaveProduct = async (e) => {
        e.preventDefault();

        setAddProductLoading(true);
        setAddProductError("");

        try {
            const token = localStorage.getItem("token");

            const payload = {
                ...productData,
                id: Number(productData.id),
                price: Number(productData.price),
                stock: Number(productData.stock),
                rating: Number(productData.rating)
            };

            let response;

            if (editingProductId) {
                response = await axios.put(`${import.meta.env.VITE_API_URL}/products/admin/${editingProductId}`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                response = await axios.post(`${import.meta.env.VITE_API_URL}/products/admin`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }
            console.log(response.data);

            await getProducts(); //refresh form

            setShowProductForm(false);   //close form
            setEditingProductId(null);

            setProductData({        //clear form
                id: "",
                name: "",
                brand: "",
                price: "",
                description: "",
                image: "",
                stock: "",
                rating: ""
            });
        }
        catch (e) {
            console.log(e.message);

            setAddProductError(e.response?.data?.message || "Failed to add product");
        }
        finally {
            setAddProductLoading(false);
        }
    }

    const getProducts = async () => {
        setProductLoading(true);
        setProductError("");

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/admin/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setProducts(response.data.products);
        }
        catch (e) {
            console.log(e.message);

            setProductError(e.response?.data?.message || "Failed to fetch products");
        }
        finally {
            setProductLoading(false);
        }
    };

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            setError("");

            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/admin/orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setOrders(response.data.orders);
            }
            catch (e) {
                console.log(e);

                setError(e.response?.data?.message || "Failed to fetch orders")
            }
            finally {
                setLoading(false);
            }
        }
        getOrders();
        getProducts();
    }, [])


    const updateOrderStatus = async (orderID, status) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/orders/admin/orders/${orderID}/status`,
                {
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderID ?
                        { ...order, status: response.data.order.status } : order
                )
            );
        }
        catch (e) {
            console.log(e);

            setError(e.response?.data?.message || "Failed to update order status");
        }
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/products/admin/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await getProducts();
        }
        catch (e) {
            console.log(e);

            setProductError(
                e.response?.data?.message ||
                "Failed to delete product"
            );
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4">Admin Dashboard</h2>
                {loading && (<p>Loading orders...</p>)}
                {error && (<p className="text-danger">{error}</p>)}

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user?.name}
                                        <br />
                                        <small>{order.user?.email}</small>
                                    </td>
                                    <td>
                                        ₹ {order.totalAmount}
                                    </td>

                                    <td>
                                        <select className="form-select" value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}>

                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>

                                    <td>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Product Management</h3>
                    <button
                        className="btn btn-dark"
                        onClick={() => setShowProductForm(!showProductForm)}>
                        {showProductForm ? "Close" : "+ Add Product"}
                    </button>
                </div>

                {/* add the form */}

                {showProductForm && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="mb-3">
                                {editingProductId ? "Edit Product" : "Add New Product"}
                            </h5>
                            <button
                                type="submit"
                                className="btn btn-dark"
                                disabled={addProductLoading}>

                                {addProductLoading
                                    ? "Saving..."
                                    : editingProductId
                                        ? "Update Product"
                                        : "Add Product"}
                            </button>
                            
                            <form onSubmit={handleSaveProduct}>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Product ID</label>
                                        <input
                                            type="number"
                                            name="id"
                                            className="form-control"
                                            value={productData.id}
                                            onChange={handleProductChange}
                                            required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={productData.name}
                                            onChange={handleProductChange}
                                            required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Brand</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            className="form-control"
                                            value={productData.brand}
                                            onChange={handleProductChange} />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            value={productData.price}
                                            onChange={handleProductChange}
                                            required />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            value={productData.description}
                                            onChange={handleProductChange} />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label">Image URL </label>
                                        <input
                                            type="text"
                                            name="image"
                                            className="form-control"
                                            value={productData.image}
                                            onChange={handleProductChange} />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label"> Stock </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="form-control"
                                            value={productData.stock}
                                            onChange={handleProductChange}
                                            required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Rating</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            className="form-control"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            value={productData.rating}
                                            onChange={handleProductChange} />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    disabled={addProductLoading}>
                                    {addProductLoading
                                        ? "Adding Product..."
                                        : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* product table */}
                <div className="mt-5">
                    {productLoading && (
                        <p>Loading products...</p>
                    )}

                    {productError && (
                        <p className="text-danger">
                            {productError}
                        </p>
                    )}

                    {!productLoading && !productError && (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>₹ {product.price}</td>
                                            <td>{product.stock} </td>
                                            <td>{product.rating}</td>



                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => handleEditProduct(product)}>
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteProduct(product._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;