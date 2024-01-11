import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const token: string | null = localStorage.getItem("token");
    const [userName, setUserName] = useState("");
    const [userSurName, setUserSurName] = useState("");
    const decodedToken: any = token ? jwtDecode(token) : null;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (decodedToken && decodedToken.id) {
                    let apiUrl = "";
                    if (decodedToken.authorities && decodedToken.authorities.includes('ROLE_ADMIN')) {
                        apiUrl = `http://localhost:8080/api/v1/laborant/laborant/${decodedToken.id}`;
                    } else if (decodedToken.authorities && decodedToken.authorities.includes('ROLE_USER')) {
                        apiUrl = `http://localhost:8080/api/v1/patient/${decodedToken.id}`;
                    }

                    if (apiUrl) {
                        const requestOptions = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                        const response = await axios.get(apiUrl, requestOptions);
                        setUserName(response.data.name);
                        setUserSurName(response.data.surName);
                    }
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };

        fetchUserInfo();
    }, [token]);

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-6 col-md-12">
                    <div className="mt-2 me-2">
                        <img src={require("../../Images/bggImage.jpg")} className="BgImage border rounded-circle shadow p-3 mb-5" alt="Background" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-5 d-flex flex-column align-items-center">
                    {!token && (
                        <>
                            <h1 className="fw-medium fs-2 ms-5 mt-5">Welcome to the Lab Report App</h1>
                            <p className="text-center fw-light fs-5 mt-3">To view your reports, please sign in.</p>
                            <Link className="btn btn-outline-dark btn-lg text-light-50 mt-3" role="button" to={"/login"} type="button">
                                Sign In
                            </Link>
                        </>
                    )}
                    {token && decodedToken.authorities && decodedToken.authorities.includes('ROLE_ADMIN') && (
                        <>
                            <h1 className="fw-medium fs-2 ms-3 mt-5">Welcome, Lab Technician {userName} {userSurName}</h1>
                            <p className="text-center fw-light fs-5 mt-3">Check Out Patients</p>
                            <Link className="btn btn-outline-dark btn-lg text-light-50 mt-3" role="button" to={"/review-patients"} type="button">
                                Check Out
                            </Link>
                        </>
                    )}
                    {token && decodedToken.authorities && decodedToken.authorities.includes('ROLE_USER') && (
                        <>
                            <h1 className="fw-medium fs-2 ms-5 mt-5">Welcome, {userName} {userSurName}</h1>
                            <p className="text-center fw-light fs-5 mt-3">Review Reports</p>
                            <Link className="btn btn-outline-dark btn-lg text-light-50 mt-3" role="button" to={"/patient-reports"} type="button">
                                Review
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
