import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    }, []);

    const submitLogin = async () => {
        try {
            if (userName !== "" && password !== "") {
                const url = `http://localhost:8080/api/v1/auth/signin`;
                const response = await axios.post(url, { userName, password });
                localStorage.setItem("token", response.data.token);
                window.location.reload();

                setDisplayWarning(false);
                setDisplaySuccess(true);
                navigate('/home');
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
        } catch (error: any) {
            console.log(error.message);
            setDisplayWarning(true);
            setDisplaySuccess(false);
            setError("Invalid username or password!");
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ width: "30rem" }}>
            {displaySuccess && (
                <div className="alert alert-success" role="alert">
                    Login Successfully
                </div>
            )}
            {displayWarning && (
                <div className="alert alert-danger" role="alert">
                    {error !== "" ? (
                        error
                    ) : (
                        <p>All fields must be filled out</p>
                    )}
                </div>
            )}
            <div className="card bg-secondary bg-opacity-75">
                <div className="card-header fw-medium">Login</div>
                <div className="card-body">
                    <form method="POST">
                        <div className="form-group">
                            <label className="form-label">User Email</label>
                            <input
                                type="text"
                                className="form-control rounded-input"
                                style={{ width: "25rem" }}
                                id="userName"
                                placeholder="Enter User Email"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control rounded-input"
                                style={{ width: "25rem" }}
                                id="password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-primary mt-3 rounded-input"
                                style={{ width: "12rem" }}
                                onClick={submitLogin}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
