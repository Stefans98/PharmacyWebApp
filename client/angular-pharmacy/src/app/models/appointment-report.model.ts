import { Patient } from "./patient.model";

export class AppointmentReport {
    constructor(
        public id: number,
        public description: string,
        public patient: Patient,
    ) { }
}