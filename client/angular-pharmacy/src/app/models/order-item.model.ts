import { Medicine } from "./medicine.model";

export class OrderItem {
    constructor(
        public id: number,
        public medicine: Medicine,
        public quantity: number
    ) { }
}