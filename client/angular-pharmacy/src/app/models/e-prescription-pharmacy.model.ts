import { Pharmacy } from "./pharmacy.model";

export class EPrescriptionPharmacy {

    constructor(
        public pharmacy : Pharmacy,
        public price : number
    ) {}
}