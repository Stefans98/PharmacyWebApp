import { AppointmentPrice } from "./appointment-price.model";
import { MedicinePrice } from "./medicine-price.model";
import { Pharmacy } from "./pharmacy.model";

export class Pricelist {
    constructor(
        public id: number,
        public pharmacy: Pharmacy,
        public medicinePrices: MedicinePrice[],
        public appointmentPrices: AppointmentPrice[]
    ) { }
}