import React from "react";
import { Link } from "react-router-dom";


const Hero = () => {
    return (
        <>
            <section className="home" id="home">
                <div className="container">
                    <div className="row align-items-center">
                        {/* left side */}
                        <div className="col-md-6">
                            <div className="hero-title">
                                <h1 className="display-3">A Statement</h1>
                                <h1 className="display-3 hero-side">Beyond</h1>
                                <h1 className="display-3">Seconds</h1>
                            </div>
                            <div className="hero-content">
                                <p className="lead mb-4 text-light">
                                    At Wristify, we transform time into an expression of power
                                    and presence. Meticulously crafted and unmistakably refined,
                                    our timepieces are made for those who lead and inspire.
                                </p>
                            </div>
                            <div className="btn">
                                <Link to="/collections" className="hero-btn">
                                SHOW NOW
                                </Link>
                            </div>
                        </div>
                        {/* right side */}
                        <div className="col-md-6 hero-image-container">
                            <img src="images/watch-img 1.png" alt="watch1 image" className="hero-img" />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Hero;