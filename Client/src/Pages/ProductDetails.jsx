import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const [error, setError] = useState("");

    useEffect(() => {
        const getProductId = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                const res = response.data;
                setProduct(res.product)
                console.log(id);
                console.log(res.product);
            }
            catch (e) {
               setError("Unable to load product. Please try again.")
            }
        }
        getProductId();
    }, [id]);


    if(error){
        return <h3 className="text-center mt-5">{error}</h3>
    };

    if (!product) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>

            <div className="container">
                <div className="mt-4">
                    <Link to="/collections">
                        ← Back to Collections
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <img src={product.image} alt={product.name} className="prod-img" />
                    </div>

                    <div className="col-md-6 mt-5">
                        <h3>{product.name}</h3>
                        <h5>{product.brand}</h5>
                        <p className="prod-desc">{product.description}</p>
                        <h6 className="prod-price">₹ {product.price}</h6>
                        <h5>In Stock: {product.stock}</h5>

                        <p className="prod-rating">{Array.from({ length: product.rating }).map((_, index) => (
                            <span key={index}>⭐</span>
                        ))}</p>

                        <div className="quantity-control">
                            <span>Qty:</span>
                            <button onClick={decreaseQuantity}>
                                -
                            </button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>
                                +
                            </button>
                        </div>
                        <button
                            className="add-btn"
                            onClick={() => addToCart({ ...product, quantity })}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;