import { Medicine } from "./medicine.model";
import { Pharmacy } from "./pharmacy.model";

export class MedicinePrice {
    constructor(
        public id: number,
        public price: number,
        public startTime: Date,
        public endTime: Date,
        public medicine: Medicine
    ) { }
}