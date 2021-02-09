import { AppointmentReport } from "./appointment-report.model";
import { Patient } from "./patient.model";
import { WorkDay } from "./work-day.model";

export class Appointment {
    constructor(
        public id: number,
        public appointmentType: number,
        public appointmentState: number,
        public startTime: Date,
        public endTime: Date,
        public patient: Patient,
        public workDay: WorkDay,
        public appointmentReport: AppointmentReport,
        public price : number
    ) { }
}
