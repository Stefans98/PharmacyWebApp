import { Medicine } from "./medicine.model";
import { Patient } from "./patient.model";

export class Prescription {
    constructor(
        public id: number,
        public medicine: Medicine,
        public patient: Patient,
        public therapyDayLength : number,
        public pharmacyId : number
    ) { }
}
