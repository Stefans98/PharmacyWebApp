import { MedicineOrderList } from "./medicine-order-list.model";

export class Offer {
    constructor(
        public id: number,
        public price: number,
        public deliveryDeadline: Date,
        public offerState: number,
        public medicineOrderList: MedicineOrderList,
        public medicineOrderListId: number,
        public supplierId: number
    ) {}
}