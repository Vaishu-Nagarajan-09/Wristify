import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        setSuccess("");
        try {
            const response = await axios.post('http://localhost:3000/users/login', loginData);
            const data = response.data;
            console.log(data);

                localStorage.setItem("token",data.token);
                setSuccess(data.message);

                alert("Login Successfully");
                navigate('/');
            
        }
        catch (e) {
            console.log(e);
            setError(e.response ?.data?.message || "Unable to login. Please try again..");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
           <div className="container">
            <h2 className="text-center mt-4">Welcome Back !</h2>
            <div className="form-card">
                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-envelope"></i> Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={loginData.email}
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value
                                });
                            }}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-lock"></i> Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={loginData.password}
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value
                                });
                            }} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && (<p className="form-error">{error}</p> )}
                    {success && (<p className="form-success">{success}</p> )}

                    <p className="text-center mt-3">
                        Don't have an account?
                        <Link to="/register" className="ms-3">Create Account</Link>
                    </p>

                </form>
            </div>
        </div>

        </>
    )
}

export default Login;