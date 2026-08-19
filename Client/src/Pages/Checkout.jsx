import React, { useContext, useState } from "react";
import { CartContext } from '../context/CartContext';
import axios from "axios";

const Checkout = () => {
    const{ cart, clearCart } = useContext(CartContext);
    const[shippingData, setShippingData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

     const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const total = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    },0);

    const handleChange = (e) =>{
        setShippingData({
            ...shippingData, [e.target.name] : e.target.value
        });
    }

    const handlePlaceOrder = async(e) => {
        e.preventDefault();

        console.log("Shipping Details", shippingData);
        console.log("Cart", cart);
        console.log("Total", total);

        setLoading(true);
        setError("");
        setSuccess("");

        try{
            const token = localStorage.getItem("token");

            const products = cart.map((product) => ({
                product: product._id,
                quantity: product.quantity,
                price: product.price
            })) ;

            console.log(cart);

            const response = await axios.post("http://localhost:3000/orders",
                {
                    products,
                    shippingAddress: shippingData,
                    totalAmount: total
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                }
            );
            console.log(response.data);
            setSuccess(response.data.message);
            clearCart();
        }
        catch(e){
            console.log(e);
            setError(
                e.response?.data?.message || "Failed to Place Order"
            );
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <>
        <div className="container mt-4">
            <h2 className="text-center mb-4">Checkout</h2>
            <div className="row">
                <div className="col-lg-7">
                    <div className="checkout-card">
                        <div className="card-body">
                            <h4 className="mb-4">Shipping Details</h4>
                            <form onSubmit={handlePlaceOrder}>

                                <div className="mb-3">
                                    <label className="form-label">Full Name:</label>
                                    <input type="text" name="name" className="form-control"
                                    value={shippingData.name} onChange={handleChange} required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input type="email" name="email" className="form-control"
                                    value={shippingData.email} onChange={handleChange} required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Address:</label>
                                    <textarea name="address" rows="3" className="form-control"
                                    value={shippingData.address} onChange={handleChange} required
                                    ></textarea>
                                </div>

                                   <div className="mb-3">
                                    <label className="form-label">Phone:</label>
                                    <input type="tel" name="phone" className="form-control"
                                    value={shippingData.phone} onChange={handleChange} required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                    <label className="form-label">City:</label>
                                    <input type="text" name="city" className="form-control"
                                    value={shippingData.city} onChange={handleChange} required
                                    />
                                </div>

                                 <div className="col-md-4 mb-3">
                                    <label className="form-label">State:</label>
                                    <input type="text" name="state" className="form-control"
                                    value={shippingData.state} onChange={handleChange} required
                                    />
                                </div>

                                 <div className="col-md-4 mb-3">
                                    <label className="form-label">Pincode:</label>
                                    <input type="text" name="pincode" className="form-control"
                                    value={shippingData.pincode} onChange={handleChange} required
                                    />
                                </div>
                                </div>
                                
                                <button type="submit" className="btn btn-dark w-100" 
                                disabled={loading || cart.length === 0} > 
                                {loading ? "Placing Order" : "Place Order"} 
                                </button>

                            </form>
                            {error && (
                                <p className="text-danger mt-3">
                                    {error}
                                </p>)}

                            {success && (
                                <p className="text-success mt-3">
                                    {success}
                                </p>)}
                        </div>
                    </div>
                </div>
                    
                    {/* order Summary */}

                    <div className="col-lg-5 mt-4 mt-lg-0">
                        <div className="order-card">
                            <div className="card-body">
                                <h4 className="mb-4">Order Summary</h4>
                                {cart.map((product) => (
                                    <div key={product.id} className="d-flex justify-content-between mb-3">
                                        <div>
                                            <strong>{product.title}</strong>
                                            <hr />
                                            <small>Quantity: {product.quantity}</small>
                                        </div>

                                        <span>₹ {product.price * product.quantity}</span>

                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between mt-2">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h5>Total</h5>
                                    <h5>₹ {total}</h5>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}

export default Checkout;
