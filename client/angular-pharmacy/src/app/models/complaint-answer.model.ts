import { Complaint } from "./complaint.model";

export class ComplaintAnswer {
    constructor(
        public id: number,
        public text: string,
        public complaintId: number,
        public complaint: Complaint
    ) {}
}