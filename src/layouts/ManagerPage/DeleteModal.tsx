import React from "react";

const DeleteModal: React.FC<({ onConfirm: any })> = (props) => {
    return (
        <div className="modal fade" id="reportDeleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Confirmation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={props.onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
