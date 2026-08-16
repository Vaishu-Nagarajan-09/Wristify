import React, { createContext, useState } from "react";


export const CartContext = createContext();

const CartProvider = ({children}) => {

    const[cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existingProduct = prev.find(
                (item) => item.id === product.id
            );
            if(existingProduct){
                return prev.map((item) => {
                    if(item.id === product.id){
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                });
            }
            return[...prev, {
                ...product,
                quantity: 1
            }
        ];
        });
    }

    const removeFromCart = (product) => {
        setCart((prev) =>{
            return prev.filter((item) => item.id !== product.id)
        })
    }

    const increaseQuantity = (product) => {
        setCart((prev) => {
            return prev.map((item) => {
                if(item.id === product.id){
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
            })
        })
    }

    const decreaseQuantity = (product) => {
        setCart((prev) => {
            return prev.map((item) => {
                if(item.id === product.id){
                        return {
                            ...item,
                            quantity: item.quantity > 1 ?
                                item.quantity - 1 : 1
                        };
                    }
                    return item;
            })
        })
    }

    return(
        <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity} }>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;