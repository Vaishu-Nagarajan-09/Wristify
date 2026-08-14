import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">

                    <div className="col-md-3">
                        <h4>KNOW WRISTIFY</h4>
                        <ul className="footer-content">
                            <li>About Us</li>
                            <li>About Wristify Company Limited</li>
                            <li>Corporate Gifting</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4>TERMS & CONDITIONS</h4>
                        <ul className="footer-content">
                            <li>Privacy Policy</li>
                            <li>T&C and FAQs</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4>CONTACT US</h4>
                        <ul className="footer-content">
                            <li>
                                For online purchased orders
                                queries/support:
                                <span> wristifysupport@info.in</span>
                            </li>
                            <li>For Complaints: +91 9876543211</li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4>FOLLOW US</h4>

                        <ul className="footer-content">
                            <li>Blog</li>
                        </ul>

                        <div className="social-icon">
                            <i className="bi bi-twitter"></i>
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>

                </div>
                <div className="footer-bottom">
                    <p>© 2026 Wristi<span className="brand-gold">fy</span> - The Watch Store. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;