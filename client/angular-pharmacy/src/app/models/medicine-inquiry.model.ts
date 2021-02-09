import { Employee } from "./employee.models";
import { Medicine } from "./medicine.model";
import { Pharmacy } from "./pharmacy.model";

export class MedicineInquiry {
    constructor(
        public id: number,
        public pharmacy: Pharmacy,
        public employee: Employee,
        public medicine: Medicine,
    ) { }
}