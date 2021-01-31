import { OrderItem } from "./order-item.model";

export class MedicineOrderList {
    constructor(
        public orderItems: OrderItem[],
        public finalOfferDate: Date
    ) { }
}
