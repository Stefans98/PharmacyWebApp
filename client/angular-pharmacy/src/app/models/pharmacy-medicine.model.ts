import { Medicine } from "./medicine.model";
import { Pharmacy } from "./pharmacy.model";

export class PharmacyMedicine {
    constructor(
        public id: number,
        public pharmacy: Pharmacy,
        public medicine: Medicine,
        public quantity: number
    ) { }
}