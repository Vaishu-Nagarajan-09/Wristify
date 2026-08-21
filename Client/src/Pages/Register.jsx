import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post('http://localhost:3000/users/register', formData);
            console.log(response.data)
            setSuccess(response.data.message);

            alert("Registration Successfully! Please Login..");
            navigate('/login');
        }
        catch (e) {
            console.log(e.message);
            setError(e.message);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-4">Create Account</h2>
                <div className="form-card">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-person"></i> Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    });
                                }} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-envelope"></i> Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    });
                                }} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-lock"></i> Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        password: e.target.value
                                    });
                                }} />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        {error && (<p className="form-error">{error}</p>)}
                        {success && (<p className="form-success">{success}</p>)}

                        <p className="text-center mt-3">
                            Already have an account?
                            <Link to="/login" className="ms-3">Sign In</Link>
                        </p>

                    </form>

                </div>
            </div>
        </>
    )
}


export default Register;