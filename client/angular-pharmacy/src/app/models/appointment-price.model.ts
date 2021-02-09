import { Medicine } from "./medicine.model";
import { Pharmacy } from "./pharmacy.model";

export class AppointmentPrice {
    constructor(
        public id: number,
        public price: number,
        public appointmentType: number,
        public startTime: Date,
        public endTime: Date
    ) { }
}