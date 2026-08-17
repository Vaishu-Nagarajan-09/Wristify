import React from "react";
import { Link } from "react-router-dom";


const ProductOverView = () => {
    return (
        <>
            <section className="productOverview">
                <div className="container">
                    <div className="row align-items-center">
                        {/* left side */}
                        <div className="col-md-6 product">
                            <h1 className="product-title">Product Overview</h1>
                            <p className="product-content text-muted">
                                The Wristify timepiece is a celebration of refined engineering and
                                enduring elegance. Designed with meticulous attention to detail,
                                it blends sophisticated aesthetics with flawless performance.
                                Built for individuals who value distinction, this watch transitions
                                effortlessly from formal occasions to everyday excellence.
                                It is not merely an accessory — it is a statement of confidence,
                                ambition, and timeless style.
                            </p>
                            <Link to="/collections" className="product-btn">
                               View Watches
                            </Link>
                        </div>
                        {/* right side */}
                        <div className="col-md-6 product-image-container">
                            <img src="images/watch-img 16.png" alt="watch2 img" className="product-img" />
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default ProductOverView;