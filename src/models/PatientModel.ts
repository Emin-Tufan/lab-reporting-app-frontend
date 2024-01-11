class PatientModel {
    id: number
    name: string;
    surName: string;
    userName: string;
    identityNumber: string;

    constructor(
        id: number,
        name: string,
        surName: string,
        userName: string,
        identityNumber: string
    ) {
        this.id = id;
        this.name = name;
        this.surName = surName;
        this.userName = userName;
        this.identityNumber = identityNumber;
    }
}
export default PatientModel;