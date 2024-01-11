class PatientReportModel {
    patientId: number;
    laborantId: number;
    diagnosisTitle: string;
    diagnosisDetail: string;
    reportImage: any;

    constructor(
        patientId: number,
        laborant: number,
        diagnosisTitle: string,
        diagnosisDetail: string,
        reportImage: any
    ) {
        this.patientId = patientId;
        this.laborantId = laborant;
        this.diagnosisTitle = diagnosisTitle;
        this.diagnosisDetail = diagnosisDetail;
        this.reportImage = reportImage;
    }
}
export default PatientReportModel;