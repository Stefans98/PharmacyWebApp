export class ResetPassword {
    constructor(
        public userId : number,
        public passwordReset : boolean,
        public newPassword : string
    ) {}
}