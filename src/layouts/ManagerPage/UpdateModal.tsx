import { useEffect, useState } from "react"

export const UpdateModal: React.FC<{ title: string, detail: string, updateReport: any }> = (props) => {
    const [patientDetail, setPatientDetail] = useState('');
    const [patientTitle, setPatientTitle] = useState('');
    const [reportImage, setReportImage] = useState<any>();

    useEffect(() => {
        setPatientDetail(props.detail);
        setPatientTitle(props.title);
    }, [props.detail, props.title]);


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

        <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
            id="reportUpdateModal" tabIndex={-1} aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateModalLabel">Update Patient Detail</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title-name" className="col-form-label">Title</label>
                                <input type="text" className="form-control" id="recipient-name"
                                    onChange={e => { setPatientTitle(e.target.value) }} value={patientTitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description-text" className="col-form-label">Description</label>
                                <textarea className="form-control" id="message-text"
                                    onChange={e => { setPatientDetail(e.target.value) }} value={patientDetail} />
                            </div>
                            <div>
                                <div className=" mb-3">
                                    <label htmlFor="inputReportImage" className="form-label">Change Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={base64ConversionForImages}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => props.updateReport(patientTitle, patientDetail, reportImage)}>Update Report</button>
                    </div>
                </div>
            </div>
        </div>
    )

}