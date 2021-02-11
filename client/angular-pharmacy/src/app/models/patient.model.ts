import { Medicine } from "./medicine.model";

export class Patient {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public city: string,
        public country: string,
        public street: string,
        public email: string,
        public phoneNumber: string,
        public points: number,
        public userCategory: number,
        public password: string,
        public medicines: Medicine[]
    ) { }
}
