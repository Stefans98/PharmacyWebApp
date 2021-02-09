import { Substitution } from "./substitution.model";

export class MedicineSpecification {
    constructor(
        public dailyDose : number,
        public contraindication : string,
        public substitutions: Substitution[],
        public ingredients: string[]
    ) { }
}