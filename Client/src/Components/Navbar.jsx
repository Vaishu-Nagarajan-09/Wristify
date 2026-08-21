import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {

  const { cart } = useContext(CartContext);

  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
        <div className="container">

          <Link className="navbar-brand fs-4" to='/'>
            <span className="brand-white">Wristi</span>
            <span className="brand-gold">fy</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mx-auto gap-4 action-nav">

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/collections" className="nav-link">Collections</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            <ul className="navbar-nav align-items-center gap-4 action-nav">
              <li className="nav-item">
                <Link to="/search" className="search-link">
                  <i className="bi bi-search nav-icon"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wishlist"><i className="bi bi-heart-fill nav-icon"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/cart"><i className="bi bi-cart-fill nav-icon"></i></Link>
                <span className="text-white">({cart.length})</span>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown">
                    <button className="btn text-black dropdown-toggle" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      Welcome, {user?.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link to="/my-orders" className="dropdown-item">
                          <i className="bi bi-box-seam me-2"></i>
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="btn">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}


export default Navbar;