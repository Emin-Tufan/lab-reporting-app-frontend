import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import PatientReportModel from "../../models/PatientReportModel";
import { jwtDecode } from "jwt-decode";

export const AddReport = () => {
    const [patientId, setPatientId] = useState(1);
    const [laborantId, setLaborantId] = useState(1);
    const [diagnosisTitle, setDiagnosisTitle] = useState("");
    const [diagnosisDetail, setDiagnosisDetail] = useState("");
    const [reportImage, setReportImage] = useState<any>(null);
    const [patientName, setPatientName] = useState('');
    const [patientSurName, setPatientSurName] = useState('');
    const [patientIdentityNum, setPatientIdentityNum] = useState('');

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token as any);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            const url = `http://localhost:8080/api/v1/laborant/${id}`;
            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                const response = await axios.get(url, requestOptions);
                setPatientName(response.data.name);
                setPatientSurName(response.data.surName);
                setLaborantId(Number(decodedToken.id));
                setPatientIdentityNum(response.data.identityNumber);
                setPatientId(Number(id));
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchPatient();
    }, [decodedToken.id, id, token]);

    async function submitNewReport() {
        const url = `http://localhost:8080/api/v1/laborant/add-report`;

        if (
            patientId !== 0 &&
            laborantId !== 0 &&
            diagnosisTitle !== '' &&
            diagnosisDetail !== ''
        ) {
            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const newReportRequest: PatientReportModel = {
                patientId,
                laborantId,
                diagnosisTitle,
                diagnosisDetail,
                reportImage
            };

            try {
                await axios.post(url, newReportRequest, requestOptions);
                setDisplaySuccess(true);
                setDisplayWarning(false);
                navigate("/review-reports");
            } catch (error: any) {
                console.log(error.message);
                setDisplaySuccess(false);
                setDisplayWarning(true);
            }
        } else {
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setReportImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div className="container mt-5 mb-5">

            <div className="container">
                <div className="card card-body">
                    {displaySuccess && (
                        <div className="alert alert-success" role="alert">
                            Report Added Successfully
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
                                <fieldset disabled>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="disableName" className="form-label">Name</label>
                                            <input
                                                value={patientName}
                                                type="text"
                                                className="form-control"
                                                id="disableName"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="disableSurName" className="form-label">Surname</label>
                                            <input
                                                value={patientSurName}
                                                type="text"
                                                className="form-control"
                                                id="disableSurName"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="disableIdentity" className="form-label">Identity Number</label>
                                            <input
                                                value={patientIdentityNum}
                                                type="text"
                                                className="form-control"
                                                id="disableIdentity"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="inputDiagnosisTitle" className="form-label">Diagnosis Title</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setDiagnosisTitle(e.target.value)}
                                        required
                                        value={diagnosisTitle}
                                        className="form-control"
                                        id="inputDiagnosisTitle"
                                        placeholder="Diagnosis Title"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="inputDiagnosisDetail" className="form-label">Diagnosis Detail</label>
                                    <textarea
                                        className="form-control"
                                        onChange={(e) => setDiagnosisDetail(e.target.value)}
                                        required
                                        value={diagnosisDetail}
                                        id="inputDiagnosisDetail"
                                        placeholder="Diagnosis Detail"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="inputReportImage" className="form-label">Report Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={base64ConversionForImages}
                                    />
                                </div>
                                <div className="col-12">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={submitNewReport}
                                    >
                                        Save Report
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
