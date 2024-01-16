const ImageModal: React.FC<({ image: string, id: number })> = (props) => {

    return (
        <div className="modal fade" id={`showImage${props.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Report Image</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={props.image} className="img-fluid" alt="modal img"
                        ></img>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ImageModal;
