class LaborantModel {
    name: string;
    surName: string;
    userName: string;
    password: string;
    identityNumber: string;
    hospitalId: string;

    constructor(
        name: string,
        surName: string,
        userName: string,
        password: string,
        identityNumber: string,
        hospitalId: string
    ) {
        this.name = name;
        this.surName = surName;
        this.userName = userName;
        this.password = password;
        this.identityNumber = identityNumber;
        this.hospitalId = hospitalId;
    }
}
export default LaborantModel;