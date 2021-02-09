import { MedicineSpecification } from "./medicine-specification.model";
import { Substitution } from "./substitution.model";

export class Medicine {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public manufacturer: string,
        public medicineType: number,
        public medicineForm: number,
        public averageGrade: number,
        public additionalInformation: string,
        public points: number,
        public onPrescription: boolean,
        public medicineSpecification: MedicineSpecification
    ) { }
}
