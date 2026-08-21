import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from 'axios';
import Navbar from "../components/Navbar";

const Collections = () => {

    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState("");
 
    useEffect(() => {
        const getProducts = async () => {
            try{
                const response = await axios.get('http://localhost:3000/products');
                const res = response.data;
                setProducts(res.products);
                console.log(res.products);
                console.log(res.products[0].image);
            }
            catch(e){
                console.log(e.message);
                setError("Unable to load products. Please try again.");
            }
            finally{
                setLoading(false);
            }
        };
        getProducts();
    }, [])




    return(
        <>
        <div className="container collection-title">
            <h2>Our Collections</h2>
            <p className="collection-desc">Discover timeless watches crafted for every occasion.</p>
            <div className="row">
                {loading ? (
                    <h3>Loading...</h3>
                ) : error ? (
                    <h3>{error}</h3>
                ) : (
                 products.map((product) => {
                return(
                   <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                    <ProductCard product={product} />
                   </div>
                );
            })
             )}
            </div>
        </div>
        </>
    )
}

export default Collections;