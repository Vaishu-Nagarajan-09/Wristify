import React from "react";
import{ Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Collections from "../pages/Collections";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";


const AppRoutes = () =>{
    return(
       <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/collections" element={<Collections/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product/:id" element={<ProductDetails/>} />
        </Routes>
       </>
    )
}

export default AppRoutes;