import { Patient } from "./patient.model";
import { Pharmacy } from "./pharmacy.model";

export class Subscription {
    constructor(
        public id : number,
        public patientId : number,
        public patient : Patient,
        public pharmacyId : number,
        public pharmacy : Pharmacy
    ) {}
}