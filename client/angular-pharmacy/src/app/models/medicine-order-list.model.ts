import { OrderItem } from "./order-item.model";

export class MedicineOrderList {
    constructor(
        public id: number,
        public orderItems: OrderItem[],
        public finalOfferDate: Date,
        public pharmacyAdministratorId: number
    ) { }
}
