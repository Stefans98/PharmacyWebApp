import { Dermatologist } from "./dermatologist.model";
import { Pharmacy } from "./pharmacy.model";

export class WorkDay {
    constructor(
        public id: number,
        public date: Date,
        public pharmacy: Pharmacy,
        public employee: Dermatologist
    ) { }
}