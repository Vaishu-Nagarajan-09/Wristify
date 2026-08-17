import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";


const Cart = () => {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    const total = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-3">My CartList</h2>
                {cart.length === 0 ? (
                    <h2 className="text-center mt-3">Your Cart is Empty</h2>
                ) : (
                    <div className="row">
                        {cart.map((product) => {
                            return ( 
                                <div className="col-lg-4 col-md-6 col-12"
                                    key={product.id} >
                                    <ProductCard product={product}
                                        removeFromCart={() => removeFromCart(product)}
                                        increaseQuantity={() => increaseQuantity(product)}
                                        decreaseQuantity={() => decreaseQuantity(product)}
                                    />
                                </div>
                            )
                        })}
                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <p>Subtotal: ₹ {total}</p>
                            <p>Shipping: Free</p>
                            <hr />
                            <h3>Total: ₹ {total}</h3>
                            <button className="proceed-btn">Proceed to Checkout</button>
                        </div>
                    </div>

                )
                }
            </div>

        </>
    )
}

export default Cart;