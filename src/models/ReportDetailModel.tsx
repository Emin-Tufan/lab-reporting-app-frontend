class ReportDetailModel {
    reportId: number;
    laborantId: number;
    patientName: string;
    patientSurName: string;
    fileNumber: string;
    laborantName: string;
    identityNumber: string;
    diagnosisTitle: string;
    diagnosisDetail: string;
    laborantSurName: string;
    reportImage: string;
    issueDate: string;


    constructor(
        laborantId: number,
        reportId: number,
        patientName: string,
        patientSurName: string,
        fileNumber: string,
        laborantName: string,
        laborantSurName: string,
        identityNumber: string,
        diagnosisTitle: string,
        diagnosisDetail: string,
        reportImage: string,
        issueDate: string
    ) {
        this.laborantId = laborantId;
        this.reportId = reportId;
        this.patientName = patientName;
        this.patientSurName = patientSurName;
        this.laborantName = laborantName;
        this.laborantSurName = laborantSurName;
        this.identityNumber = identityNumber;
        this.diagnosisTitle = diagnosisTitle;
        this.diagnosisDetail = diagnosisDetail;
        this.reportImage = reportImage;
        this.issueDate = issueDate;
        this.fileNumber = fileNumber;
    }
}
export default ReportDetailModel;