package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;

import java.util.Date;
import java.util.List;

public class MedicineOrderListDto {

    private Long id;
    private Date finalOfferDate;
    private List<OrderItemDto> orderItems;
    private PharmacyDto pharmacy;
    private long pharmacyAdministratorId;

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

    public PharmacyDto getPharmacy() { return pharmacy; }

    public void setPharmacy(PharmacyDto pharmacy) { this.pharmacy = pharmacy; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getPharmacyAdministratorId() {
        return pharmacyAdministratorId;
    }

    public void setPharmacyAdministratorId(long pharmacyAdministratorId) {
        this.pharmacyAdministratorId = pharmacyAdministratorId;
    }
}
