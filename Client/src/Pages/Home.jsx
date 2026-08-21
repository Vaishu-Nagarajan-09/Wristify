import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductOverView from "../components/ProductOverView";
import VideoPromo from "../components/VideoPromo";
import CustomerReviews from "../components/CustomerReviews";
import WristifyJournal from "../components/WristifyJournal";
import Footer from "../components/Footer";

const Home = () =>{
    return(
        <>
        <Hero/>
        <ProductOverView/>
        <VideoPromo/>
        <CustomerReviews/>
        <WristifyJournal/>
        <Footer/>
        </>
    )
}

export default Home;