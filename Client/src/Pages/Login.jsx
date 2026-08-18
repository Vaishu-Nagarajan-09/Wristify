import axios from "axios";
import React from "react";
import { useState } from "react";

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        setSuccess("");
        try {
            const response = await axios.post('http://localhost:3000/user/login', loginData);
            const data = response.data;
            console.log(data);
            setSuccess(data.message);

                localStorage.setItem("token",data.token);
               

                alert("Login Successfully");
            
        }
        catch (e) {
            console.log(e);
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"><i className="bi bi-envelope"></i> Email:</label>
                                    <input type="email" className="form-control" name="email"
                                        value={loginData.email}
                                        onChange={(e) => {
                                            setLoginData({
                                                ...loginData,
                                                email: e.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label"><i className="bi bi-lock"></i> Password:</label>
                                    <input type="password" className="form-control" name="password"
                                        value={loginData.password}
                                        onChange={(e) => {
                                            setLoginData({
                                                ...loginData,
                                                password: e.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <button type="submit" disabled={loading} className="btn-log w-100 mb-2">{loading ? "Logging in..." : "Login"}</button>

                                {error && <p>{error}</p>}
                                {success && <p>{success}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;