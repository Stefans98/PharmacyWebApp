import { Dermatologist } from "./dermatologist.model";
import { Patient } from "./patient.model";
import { Pharmacist } from "./pharmacist.model";
import { Pharmacy } from "./pharmacy.model";

export class Complaint {
    constructor(
        public id: number,
        public complaintType: string,
        public text: string,
        public answered: boolean,
        public patientId: number,
        public patient: Patient,
        public pharmacyId: number,
        public pharmacy: Pharmacy,
        public pharmacistId: number,
        public pharmacist: Pharmacist,
        public dermatologistId: number,
        public dermatologist: Dermatologist
    ) {}
}