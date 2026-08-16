import React from "react";
import products from "../data/Products";
import ProductCard from "../components/ProductCard";


const Collections = () => {

    return(
        <>
        <div className="container collection-title">
            <h2>Our Collections</h2>
            <p className="collection-desc">Discover timeless watches crafted for every occasion.</p>
            <div className="row">
                 {products.map((product) => {
                return(
                   <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                    <ProductCard product={product} />
                   </div>
                )
             })}
            </div>
        </div>
        </>
    )
}

export default Collections;