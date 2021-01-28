export class Patient {
    constructor(
        public id: number,
        public firstName: String,
        public lastName: String,
        public city: String,
        public country: String,
        public street: String,
        public email: String,
        public phoneNumber: String,
        public points: number,
        public userCategory: number,
        public password: String
        ) { }
}
