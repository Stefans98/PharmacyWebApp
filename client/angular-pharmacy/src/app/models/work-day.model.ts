import { Employee } from "./employee.models";
import { Pharmacy } from "./pharmacy.model";

export class WorkDay {
    constructor(
        public id: number,
        public startTime: Date,
        public endTime: Date,
        public pharmacy: Pharmacy,
        public employee: Employee
    ) { }
}