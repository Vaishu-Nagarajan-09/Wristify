import React, { useEffect, useState } from "react";
import axios from 'axios';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getMyOrders = async () => {
            setLoading(true);
            setError("");

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/orders/my-orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);
                setOrders(response.data.orders);
            }
            catch (e) {
                console.log(e);
                setError(e.response?.data?.message || "Failed to fetch Orders");
            }
            finally {
                setLoading(false);
            }
        };
        getMyOrders();
    }, [])

    return (
        <>
            <div className="container mt-4 mb-5">
                <h2 className="text-center mb-4">My Orders</h2>

                {loading && <p className="text-center">Loading Orders...</p>}
                {error && <p className="text-danger text-center">{error}</p>}

                {orders.length === 0 && !loading && (
                    <div className="text-center py-5">
                        <i className="bi bi-box-seam text-muted" style={{ fontSize: "50px" }} ></i>
                        <h5 className="mt-3"> No Orders Found </h5>
                        <p className="text-muted"> You haven't placed any orders yet. </p>
                    </div>
                )}

                {orders.map((order) => (
                    <div className="card mb-4 shadow-sm" key={order._id}>
                        <div className="card-body">

                            {/* Order Header */}

                            <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                                <div>
                                    <h5 className="mb-1"> Order Details </h5>
                                    <small className="text-muted"> ID: {order._id} </small>
                                    <br />
                                    <small className="text-muted">
                                        Ordered on:{" "} {new Date(order.createdAt).toLocaleDateString()}
                                    </small>
                                </div>

                                <div>
                                    <span className={`badge ${order.status === "Delivered" ? "bg-success"
                                        : order.status === "Shipped" ? "bg-primary"
                                            : order.status === "Confirmed" ? "bg-info text-dark"
                                                : "bg-warning text-dark"}`} >
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <hr />

                            {/* Products */}

                            <h6 className="mb-3"><i className="bi bi-box-seam me-2"></i> Products </h6>

                            {order.products.map((item, index) => (
                                <div className="d-flex justify-content-between mb-3"
                                    key={item._id || index} >

                                    <div>
                                        <strong> {item.product?.title} </strong>
                                        <div className="text-muted"> Quantity: {item.quantity}
                                        </div>

                                    </div>

                                    <strong> ₹ {item.price * item.quantity}</strong>


                                </div>

                            ))}

                            <hr />

                            {/* Shipping Address */}

                            <h6 className="mb-3"><i className="bi bi-geo-alt me-2"></i> Shipping Address </h6>

                            <div>
                                <p className="mb-1"> {order.shippingAddress.name} </p>
                                <p className="mb-1"> {order.shippingAddress.address} </p>

                                <p className="mb-1"> {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state} -{" "}
                                    {order.shippingAddress.pincode}
                                </p>

                                <p className="mb-0"> Email: {order.shippingAddress.email} </p>

                            </div>
                            <hr />

                            {/* Total */}

                            <div className="d-flex justify-content-between align-items-center">
                                <strong className="fw-semibold"> Total Amount </strong>
                                <strong className="fw-bold fs-5"> ₹ {order.totalAmount} </strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}

export default MyOrders;