import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {

    const { wishlist, removeWishlist } = useContext(WishlistContext);

    return (
        <>
        <div className="container">
            <h2 className="text-center mt-4">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <h2 className="text-center">Your Wishlist is empty ❤️</h2>
            ) : (
                <div className="row">
                    {wishlist.map((product) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-12"
                                key={product.id} >
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        </>
    )
}

export default Wishlist;