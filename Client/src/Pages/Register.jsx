import React, { useState } from "react";
import axios from 'axios';

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post('http://localhost:3000/user/register', formData);
            console.log(response.data)
            setSuccess(response.data.message);
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
            <div className="container-fluid">
                <h2>Register</h2>
                <div className="container">
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">

                                    <form onSubmit={handleSubmit}>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Name:</label>
                                                <input type="text" id="inputFname" className="form-control"
                                                    value={formData.name}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email:</label>
                                                <input type="email" id="inputFname" className="form-control"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            email: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Password:</label>
                                                <input type="password" id="inputFname" className="form-control"
                                                    value={formData.password}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            password: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" disabled={loading}>{loading ? "Creating Account..." : "Create Account"}</button>
                                        </div>
                                        {error && <p>{error}</p>}
                                        {success && <p>{success}</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register;