package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.model.medicines.OrderItem;

import java.util.Date;
import java.util.List;

public class MedicineOrderListDto {

    private Date finalOfferDate;
    private List<OrderItemDto> orderItems;

    public MedicineOrderListDto() {
    }

    public Date getFinalOfferDate() {
        return finalOfferDate;
    }

    public void setFinalOfferDate(Date finalOfferDate) {
        this.finalOfferDate = finalOfferDate;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }
}
