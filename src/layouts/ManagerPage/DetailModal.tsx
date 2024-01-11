
export const DetailModal: React.FC<{ detailTitle: string, detail: string, reportId: number }> = (props) => {
    return (
        <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
            id={`reportDetailModal${props.reportId}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.detailTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{props.detail}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailModal;
