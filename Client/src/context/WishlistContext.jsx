import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([]);

    //add to wishlist and remove duplicate
    const addToWishlist = (product) => {
        setWishlist((prev) => {
            const alreadyExists = prev.some(
                (item) => item.id === product.id
            );
            if(alreadyExists){
                return prev;
            }      
           return [...prev, product];
        });
    };

    //removewishlist product 
    const removeWishlist = (product) =>{
        setWishlist((prev) => {
            return prev.filter((item) => item.id !== product.id);
        })
    }
   

    return(
        <WishlistContext.Provider value={ {wishlist, setWishlist , addToWishlist , removeWishlist} }>
            {children}
        </WishlistContext.Provider>
    )
};

export default WishlistProvider;
