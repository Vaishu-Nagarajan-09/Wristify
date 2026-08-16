import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";


const ProductCard = ({ product, removeFromCart, increaseQuantity, decreaseQuantity }) => {

    const { wishlist, addToWishlist, removeWishlist } = useContext(WishlistContext);

    const { addToCart } = useContext(CartContext);

    const handleWishlist = () => {
        if (isWishlist) {
            removeWishlist(product);
        }
        else {
            addToWishlist(product);
        }

    }
    const isWishlist = wishlist.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        addToCart(product);
    }

    return (
        <>
            <div className="card prod-card">
                <div className="card-body">
                    <div className="prod-wrapper">
                        <img src={product.image} alt={product.name} className="prod-img" />
                        <i className={`bi ${isWishlist ? "bi-heart-fill" : "bi-heart"} wishlist-icon`}
                            onClick={handleWishlist}></i>
                    </div>
                    <h3>{product.name}</h3>
                    <h5>{product.brand}</h5>
                    <p className="prod-desc">{product.description}</p>
                    <h6 className="prod-price">₹ {product.price}</h6>
                    <h5>In Stock: {product.stock}</h5>

                    <p className="prod-rating">{Array.from({ length: product.rating }).map((_, index) => (
                        <span key={index}>⭐</span>
                    ))}</p>

                </div>

                {increaseQuantity && decreaseQuantity && (
                    <div className="quantity-control">
                        <span>Qty:</span>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                )}

                {/* only collection page show add to cart */}
                 {!increaseQuantity && (
                <button
                    className="add-btn"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            )}

               {/* only cart page show remove icon */}
                {removeFromCart && (
                    <button className="remove-btn" onClick={removeFromCart}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                )}

            </div>
        </>
    )
}

export default ProductCard;