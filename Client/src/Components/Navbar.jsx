import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
        <div className="container">
          <Link className="navbar-brand fs-4" href="#">
            <span className="brand-white">Wristi</span>
            <span className="brand-gold">fy</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto gap-4 main-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">Collections</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">Contact</Link>
              </li>
            </ul>

            <ul className="navbar-nav align-items-center gap-4 action-nav">
              <li className="nav-item">
                <i className="bi bi-search nav-icon"></i>
              </li>
              <li className="nav-item">
                <Link to="/"><i className="bi bi-heart-fill nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/wishlist"><i className="bi bi-cart-fill nav-icon"></i></Link>
              </li>
              <li className="nav-item ms-4">
                <Link to="/login" className="btn">Sign In</Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}


export default Navbar;