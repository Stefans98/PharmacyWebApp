import { Dermatologist } from "./dermatologist.model";
import { Medicine } from "./medicine.model";
import { Patient } from "./patient.model";
import { Pharmacist } from "./pharmacist.model";
import { Pharmacy } from "./pharmacy.model";

export class Grade {
    constructor(
        public id: number,
        public gradeType: string,
        public grade: number,
        public patientId: number,
        public patient: Patient,
        public pharmacyId: number,
        public pharmacy: Pharmacy,
        public pharmacistId: number,
        public pharmacist: Pharmacist,
        public dermatologistId: number,
        public dermatologist: Dermatologist,
        public medicineId: number,
        public medicine: Medicine
    ) {}
}