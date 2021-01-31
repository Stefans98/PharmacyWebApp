import { Medicine } from "./medicine.model";

export class OrderItem {
    constructor(
        public medicine: Medicine,
        public quantity: number
    ) { }
}