import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ReportDetailModel from "../../models/ReportDetailModel";
import { Link } from "react-router-dom";
import DetailModal from "../ManagerPage/DetailModal";
import { ReportRequestModal } from "./ReportRequestModal";
import ImageModal from "../ManagerPage/ImageModal";

export const ViewReportPage = () => {
    const [report, setReport] = useState<ReportDetailModel[]>([]);
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token as any);
    const patientId = decodedToken.id;
    const [isClicked, setIsClicked] = useState(false);
    const [fileNumber, setFileNumber] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);

    useEffect(() => {
        fetchReports();
        isDisable();
    }, [token, isClicked, currentPage]);

    const fetchReports = async () => {
        const url = `http://localhost:8080/api/v1/patient?patientId=${patientId}&fileNumber=${fileNumber}&page=${currentPage}`;
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(url, requestOptions);
            setTotalPage(response.data.totalPages)
            if (response.data !== null) {
                const reportLoaded: ReportDetailModel[] = response.data.content.map((data: any) => ({
                    laborantId: data.laborantId,
                    reportId: data.reportId,
                    patientName: data.patientName,
                    patientSurName: data.patientSurName,
                    laborantName: data.laborantName,
                    laborantSurName: data.laborantSurName,
                    identityNumber: data.identityNumber,
                    diagnosisTitle: data.diagnosisTitle,
                    diagnosisDetail: data.diagnosisDetail,
                    reportImage: data.reportImage,
                    issueDate: data.issueDate,
                    fileNumber: data.fileNumber,
                }));
                setReport(reportLoaded);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const isDisable = async () => {
        const url = `http://localhost:8080/api/v1/patient/isEnable?patientId=${patientId}`;
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(url, requestOptions);
        setIsClicked(response.data.reportRequest);
    };



    const openImageInNewTab = (image: any) => {
        window.open(image, '_blank');
    };

    const handleSearch = () => {
        fetchReports();
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-4 mb-3">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="File Number"
                            aria-label="Search"
                            value={fileNumber}
                            onChange={(e) => setFileNumber(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-5 d-flex mb-3">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#reportRequestModal"
                        disabled={isClicked}
                        className="btn btn-primary btn-sm"
                    >
                        Send Report Request
                    </button>
                    <ReportRequestModal isClicked={setIsClicked} />
                </div>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-secondary shadow table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">Laborant Name</th>
                                <th scope="col">Laborant Surname</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Patient Surname</th>
                                <th scope="col">Identity Number</th>
                                <th scope="col">File Number</th>
                                <th scope="col">Diagnosis Title</th>
                                <th scope="col">Diagnosis Detail</th>
                                <th scope="col">Report Image</th>
                                <th scope="col">Last Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((report) => (
                                <tr key={report.reportId}>
                                    <td>{report.laborantName}</td>
                                    <td>{report.laborantSurName}</td>
                                    <td>{report.patientName}</td>
                                    <td>{report.patientSurName}</td>
                                    <td>{report.identityNumber}</td>
                                    <td>{report.fileNumber}</td>
                                    <td>{report.diagnosisTitle}</td>
                                    <td>
                                        <Link
                                            className="link-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#reportDetailModal${report.reportId}`}
                                            to={""}
                                        >
                                            Check Patient Detail
                                        </Link>
                                        <DetailModal
                                            detail={report.diagnosisDetail}
                                            detailTitle={report.diagnosisTitle}
                                            reportId={report.reportId}
                                        />
                                    </td>
                                    <td>
                                        {report.reportImage && (
                                            <Link className="link-primary" data-bs-toggle="modal"
                                                data-bs-target={`#showImage${report.reportId}`} to={""} >
                                                Report Image
                                            </Link>
                                        )}
                                        <ImageModal image={report.reportImage} id={report.reportId} />
                                    </td>
                                    <td>{report.issueDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href='#' onClick={() => setCurrentPage((currentPage - 1 > 0) ? (currentPage - 1) : 0)}>
                                Previous
                            </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => setCurrentPage(index)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => setCurrentPage((currentPage + 1) < totalPages ? (currentPage + 1) : (totalPages))}>
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
