export class UserToken {
    constructor(
        public accessToken : string,
        public expiresIn : number
    ) {}
}