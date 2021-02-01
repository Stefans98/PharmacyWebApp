export class DermatologistExamination {
    constructor(
        public patientFullName: string,
        public dermatologistFullName: string,
        public dateOfExamination: string,
        public timePeriodOfExamination: string,
        public pharmacyName: string,
        public price: number
    ) { }
}