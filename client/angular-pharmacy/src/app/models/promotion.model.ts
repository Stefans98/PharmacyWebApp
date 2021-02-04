export class Promotion{
    constructor(
        public id: number,
        public text: string,
        public startTime: Date,
        public endTime: Date
    ){}
}