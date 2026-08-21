import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Collections from "../pages/Collections";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoute from "./AdminRoute";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";


const AppRoutes = () => {
    return (
        <>
         <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    } />
                <Route path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } />

                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<MyOrders />} />

                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />

                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </>
    )
}

export default AppRoutes;