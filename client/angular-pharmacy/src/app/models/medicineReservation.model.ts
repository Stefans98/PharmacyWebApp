export class MedicineReservation {
    constructor(
        public id: number,
        public finalPurchasingDate :Date,
        public isCanceled: boolean,
        public medicineId: number,
        public pharmacyId: number,
        public patientId: number 
    ) { }
}
