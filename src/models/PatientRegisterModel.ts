class PatientRegisterModel {
    name: string;
    surName: string;
    userName: string;
    identityNumber: string;
    password: string

    constructor(
        name: string,
        surName: string,
        userName: string,
        identityNumber: string,
        password: string
    ) {
        this.name = name;
        this.surName = surName;
        this.userName = userName;
        this.identityNumber = identityNumber;
        this.password = password;
    }
}
export default PatientRegisterModel;