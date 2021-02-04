export class Vacation {
    constructor(
        public id: number,
        public vacationType: number,
        public startTime: Date,
        public endTime: Date,
        public employeeId: number,
        public pharmacyId: number
    ) { }
}