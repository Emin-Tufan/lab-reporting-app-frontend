import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const ReportRequestModal: React.FC<{ isClicked: any }> = (props) => {
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token as any);
    const patientId = decodedToken.id;

    const createRequets = async () => {

        const url = `http://localhost:8080/api/v1/patient?patientId=${patientId}`;
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const body = {
            patientId: patientId
        }
        await axios.post(url, body, requestOptions).then((response) => {
            props.isClicked(true);

        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="modal fade" id="reportRequestModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Confirmation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to request for report?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={createRequets}>Create Request</button>
                    </div>
                </div>
            </div>
        </div>
    );
}