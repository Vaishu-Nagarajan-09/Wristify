import React, { useState } from "react";

const Contact = () => {
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setContactData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Contact Data:", contactData);

        alert("Message sent successfully!");

        setContactData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="container py-3">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9">
                    <div className="contact-card p-4 p-md-5">
                        <h2 className="text-center mb-2">
                            Contact Wristify</h2>
                        <p className="text-center text-muted mb-4">
                            Have a question or need help? We'd love to hear from you. </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"> Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={contactData.name}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={contactData.email}
                                    onChange={handleChange}
                                    required  />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Subject </label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Enter subject"
                                    value={contactData.subject}
                                    onChange={handleChange}
                                    required  />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Write your message..."
                                    value={contactData.message}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark w-100" >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;