import { useState } from "react";
import axios from "axios";
import PatientRegisterModel from "../../models/PatientRegisterModel";
import { useNavigate } from "react-router-dom";

export const RegisterPatient = () => {
    const [patientName, setPatientName] = useState('');
    const [patientSurName, setPatientSurName] = useState('');
    const [patientUserName, setPatientUserName] = useState('');
    const [patientPwd, setPatientPwd] = useState('');
    const [patientIdentityNum, setPatientIdentityNum] = useState('');

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const navigate = useNavigate();

    const registerNewPatient = async () => {
        const url = `http://localhost:8080/api/v1/auth/register`;

        if (
            patientName !== '' &&
            patientSurName !== '' &&
            patientUserName !== '' &&
            patientPwd !== '' &&
            patientIdentityNum !== ''
        ) {
            const newPatientRequest: PatientRegisterModel = {
                name: patientName,
                surName: patientSurName,
                userName: patientUserName,
                identityNumber: patientIdentityNum,
                password: patientPwd
            };

            try {
                await axios.post(url, newPatientRequest);
                navigate("/login");
                setDisplaySuccess(true);
                setDisplayWarning(false);
            } catch (error: any) {
                console.log(error.message);
                setDisplaySuccess(false);
                setDisplayWarning(true);
            }
        } else {
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    };

    return (
        <div className="container mt-5 mb-5">

            <div className="container">
                <div className="card card-body shadow">
                    {displaySuccess && (
                        <div className="alert alert-success" role="alert">
                            Patient registered successfully! Thank you.
                        </div>
                    )}
                    {displayWarning && (
                        <div className="alert alert-danger" role="alert">
                            Oops! Something went wrong. Please check your information and try again.
                        </div>
                    )}

                    <div className="form">
                        <form>
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input
                                            required
                                            placeholder="First Name"
                                            onChange={(e) => setPatientName(e.target.value)}
                                            value={patientName}
                                            type="text"
                                            className="form-control"
                                            id="inputName"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="inputSurName" className="form-label">Surname</label>
                                        <input
                                            required
                                            placeholder="Surname"
                                            onChange={(e) => setPatientSurName(e.target.value)}
                                            value={patientSurName}
                                            type="text"
                                            className="form-control"
                                            id="inputSurName"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="inputIdentity" className="form-label">Identity Number</label>
                                        <input
                                            required
                                            onChange={(e) => setPatientIdentityNum(e.target.value)}
                                            value={patientIdentityNum}
                                            type="text"
                                            className="form-control"
                                            placeholder="Identity number"
                                            id="inputIdentity"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="inputUserName" className="form-label">Username</label>
                                        <input
                                            required
                                            onChange={(e) => setPatientUserName(e.target.value)}
                                            value={patientUserName}
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            id="inputUserName"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="inputPwd" className="form-label">Password</label>
                                        <input
                                            required
                                            onChange={(e) => setPatientPwd(e.target.value)}
                                            value={patientPwd}
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            id="inputPwd"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={registerNewPatient}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
