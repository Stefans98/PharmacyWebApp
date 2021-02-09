export class LoyaltyProgram {
    constructor(
        public silverPointsBorder: number,
        public goldPointsBorder: number,
        public silverCategoryDiscount: number,
        public goldCategoryDiscount: number,
        public pointsPerExaminations: number,
        public pointsPerCounseling: number
    ) { }
}