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
                    <p className="text-center">No Orders Found.</p>
                )}

                {orders.map((order) => (
                    <div className="card mb-4 shadow-sm" key={order._id}>
                        <div className="card-body">

                            {/* Order Header */}

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h5 className="mb-1"> Order </h5>
                                    <small className="text-muted"> ID: {order._id} </small>
                                </div>

                                <span className="badge bg-warning text-dark"> {order.status} </span>
                            </div>

                            <hr />

                            {/* Products */}

                            <h6 className="mb-3"> Products </h6>
                            {order.products.map((item, index) => (
                                <div className="d-flex justify-content-between mb-3"
                                    key={item._id || index} >

                                    <div>
                                        <strong> {item.product?.title} </strong>
                                        <div className="text-muted"> Quantity: {item.quantity}
                                        </div>

                                    </div>

                                    <div> ₹ {item.price * item.quantity}
                                    </div>

                                </div>

                            ))}

                            <hr />

                            {/* Shipping Address */}

                            <h6> Shipping Address </h6>

                            <p className="mb-1"> {order.shippingAddress.name} </p>
                            <p className="mb-1"> {order.shippingAddress.address} </p>

                            <p className="mb-1"> {order.shippingAddress.city},{" "}
                                {order.shippingAddress.state} -{" "}
                                {order.shippingAddress.pincode}
                            </p>

                            <p className="mb-3"> Email: {order.shippingAddress.email} </p>

                            <hr />

                            {/* Total */}

                            <div className="d-flex justify-content-between align-items-center">
                                <strong> Total Amount </strong>
                                <strong> ₹ {order.totalAmount} </strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}

export default MyOrders;