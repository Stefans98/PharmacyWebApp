import { Appointment } from "./appointment.model";
import { Prescription } from "./prescription.model";

export class AppointmentReport {
    constructor(
        public id: number,
        public description: string,
        public appointment: Appointment,
        public prescriptions : Prescription[]
    ) { }
}