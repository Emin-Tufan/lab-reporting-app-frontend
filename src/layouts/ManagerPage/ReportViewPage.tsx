import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportDetailModel from "../../models/ReportDetailModel";
import { Link } from "react-router-dom";
import { DetailModal } from "./DetailModal";
import { jwtDecode } from "jwt-decode";
import { UpdateModal } from "./UpdateModal";
import DeleteModal from "./DeleteModal";


const ReportReviewPage = () => {
    const [report, setReport] = useState<ReportDetailModel[]>([]);
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token as any);
    const [selectedReport, setSelectedReport] = useState<ReportDetailModel | undefined>();
    const [name, setName] = useState<string>('');
    const [surName, setSurName] = useState<string>('');
    const [fileNumber, setFileNumber] = useState<string>('');
    const [sortByDate, setSortByDate] = useState('desc');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);


    useEffect(() => {
        fetchReports();
    }, [token, sortByDate, sortByDate, currentPage]);

    const fetchReports = async () => {
        const url = `http://localhost:8080/api/v1/laborant/patient-reports?name=${name}&surName=${surName}&fileNumber=${fileNumber}&sortDirection=${sortByDate}&laborantId=${decodedToken.id}&page=${currentPage}`;
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
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
                    identityNumber: data.identityNumber,
                    diagnosisTitle: data.diagnosisTitle,
                    diagnosisDetail: data.diagnosisDetail,
                    reportImage: data.reportImage,
                    issueDate: data.issueDate,
                    fileNumber: data.fileNumber
                }));
                setReport(reportLoaded);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }


    const openImageInNewTab = (image: any) => {
        window.open(image, '_blank');
    };

    const confirmDelete = async () => {
        if (!selectedReport) return;

        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: any = jwtDecode(token as any);
            const url = `http://localhost:8080/api/v1/laborant/delete/${selectedReport.reportId}/${decodedToken.id}`;
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                await axios.delete(url, requestOptions);
                setReport(prevReports => prevReports.filter(prevReport => prevReport.reportId !== selectedReport.reportId));
            } catch (error: any) {
                console.error(error.message);
            } finally {
                setSelectedReport(undefined);
            }
        }
    };

    const handleSearch = () => {
        fetchReports();
    };
    const updateReport = async (diagnosisTitle: string,
        diagnosisDetail: string, reportImage: string) => {
        if (!selectedReport) return;

        if (token) {
            const decodedToken: any = jwtDecode(token as any);
            const reportId = selectedReport.reportId;
            const laborantId = decodedToken.id;

            const url = `http://localhost:8080/api/v1/laborant/update-report`;
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                await axios.put(url, {
                    diagnosisTitle, diagnosisDetail, reportImage, reportId, laborantId
                }, requestOptions);
                fetchReports();
            } catch (error: any) {
                console.error("Report update error:", error.message);
            } finally {
                setSelectedReport(undefined);
            }
        }
    }

    return (
        <div className="container mt-5">
            <ul className='nav nav-pills card-header-pills mb-3'>
                <li className='nav-item me-3'>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Name"
                        aria-label="Search"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </li>
                <li className='nav-item me-3'>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="SurName"
                        aria-label="Search"
                        value={surName}
                        onChange={(e) => setSurName(e.target.value)}
                    />
                </li>
                <li className='nav-item me-3'>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="File Number"
                        aria-label="Search"
                        value={fileNumber}
                        onChange={(e) => setFileNumber(e.target.value)}
                    />
                </li>
                <li className='nav-item me-3'>
                    <button className="btn btn-outline-success" onClick={handleSearch}>
                        Search
                    </button>
                </li>
                <li className="nav-item me-3">
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => setSortByDate('desc')}>Recent Date</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => setSortByDate('asc')}>Oldest Date</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div className="card-body">
                <table className="table table-secondary shadow table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">Patient Name</th>
                            <th scope="col">Patient SurName</th>
                            <th scope="col">Identity Number</th>
                            <th scope="col">File Number</th>
                            <th scope="col">Diagnosis Title</th>
                            <th scope="col">Diagnosis Detail</th>
                            <th scope="col">Report Image</th>
                            <th scope="col">Last Modified Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((report) => (
                            <tr key={report.reportId}>
                                <td>{report.patientName}</td>
                                <td>{report.patientSurName}</td>
                                <td>{report.identityNumber}</td>
                                <td>{report.fileNumber}</td>
                                <td>{report.diagnosisTitle}</td>
                                <td>
                                    <Link className="link-primary" data-bs-toggle="modal"
                                        data-bs-target={`#reportDetailModal${report.reportId}`} to={""}>
                                        Check Patient Detail
                                    </Link>
                                    <DetailModal detail={report.diagnosisDetail}
                                        detailTitle={report.diagnosisTitle} reportId={report.reportId} />
                                </td>
                                <td>
                                    {report.reportImage && (
                                        <Link className="link-primary" onClick={() => openImageInNewTab(report.reportImage)} to={""}>
                                            Report Image
                                        </Link>
                                    )}
                                </td>
                                <td>{report.issueDate}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles delete">
                                        <button type="button" data-bs-toggle="modal"
                                            data-bs-target={report.laborantId === decodedToken.id &&
                                                `#reportDeleteModal`} className="btn btn-danger"
                                            onClick={() => setSelectedReport(report)}>
                                            Delete
                                        </button>
                                        <DeleteModal
                                            onConfirm={confirmDelete}
                                        />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target={report.laborantId === decodedToken.id &&
                                                `#reportUpdateModal`} onClick={() => setSelectedReport(report)}>
                                            Update
                                        </button>
                                        <UpdateModal
                                            title={report.diagnosisTitle}
                                            detail={report.diagnosisDetail}
                                            updateReport={updateReport}
                                        />
                                    </div>
                                </td>
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
    );

}
export default ReportReviewPage;
