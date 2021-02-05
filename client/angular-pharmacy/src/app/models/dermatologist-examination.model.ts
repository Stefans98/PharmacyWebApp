export class DermatologistExamination {
    constructor(
        public id: number,
        public patientFullName: string,
        public dermatologistFullName: string,
        public dateOfExamination: string,
        public timePeriodOfExamination: string,
        public pharmacyName: string,
        public price: number,
        public averageGrade: number
    ) { }
}