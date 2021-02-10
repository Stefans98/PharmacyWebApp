import { EPrescriptionItem } from "./e-prescription-item.model";
import { Pharmacy } from "./pharmacy.model";

export class EPrescription {
    constructor(
        public id : number,
        public patientId : number,
        public issuingDate : Date,
        public items : EPrescriptionItem[],
        public pharmacyId : number,
        public pharmacy : Pharmacy,
        public price : number
    ) {}
}