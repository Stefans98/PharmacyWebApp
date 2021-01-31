import { Medicine } from "./medicine.model";
import { Pharmacy } from "./pharmacy.model";

export class MedicineReservation {
    constructor(
        public id: number,
        public finalPurchasingDate: Date,
        public isCanceled: boolean,
        public medicineId: number,
        public pharmacyId: number,
        public patientId: number,
        public pharmacy: Pharmacy,
        public medicine: Medicine,
        public medicinePrice : number
    ) { }
}
