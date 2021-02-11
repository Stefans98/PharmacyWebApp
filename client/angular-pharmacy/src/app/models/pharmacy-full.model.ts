export class PharmacyFull {
    constructor(
        public id: number,
        public name: string,
        public city: string,
        public country: string,
        public street: string,
        public description: string,
        public averageGrade: number,
        public address: string,
        public price: number,
        public longitude: number,
        public latitude: number
    ) { }
}