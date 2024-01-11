import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PatientModel from '../../models/PatientModel';
import { useNavigate } from 'react-router-dom';

const ViewPatients = () => {
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [name, setName] = useState<string>('');
    const [surName, setSurName] = useState<string>('');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPatients = async () => {

            const url = `http://localhost:8080/api/v1/laborant/patients?name=${name}&surName=${surName}&page=${currentPage}`;
            try {
                const requestOptions = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const response = await axios.get(url, requestOptions);
                setTotalPage(response.data.totalPages)
                const patientLoaded: PatientModel[] = response.data.content.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    surName: item.surName,
                    userName: item.userName,
                    identityNumber: item.identityNumber,
                }));
                setPatients(patientLoaded);
            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchPatients();
    }, [isClicked, currentPage, totalPages]);



    const handleSubmit = (patient: PatientModel) => {
        navigate(`/add-report/${patient.id}`);
    };

    const handleSearch = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="container mt-5">
            <div className='card-header mb-3 '>
                <ul className='nav nav-pills card-header-pills'>
                    <li className='nav-item me-3'  >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Name"
                            aria-label="Search"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </li>
                    <li className='nav-item'>
                        <input
                            className="form-control "
                            type="search"
                            placeholder="SurName"
                            aria-label="Search"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                        />
                    </li>
                    <li className='item ms-3'>
                        <button className="btn btn-outline-success" onClick={handleSearch}>
                            Search
                        </button>
                    </li>
                </ul>
            </div>
            <div className='card-body'>
                <table className="table table-secondary shadow table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col"> Name</th>
                            <th scope="col"> Surname</th>
                            <th scope="col"> Email-Username</th>
                            <th scope="col"> Identity Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.surName}</td>
                                <td>{patient.userName}</td>
                                <td>{patient.identityNumber}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm " onClick={() => handleSubmit(patient)}>
                                        Create Report
                                    </button>
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

export default ViewPatients;
