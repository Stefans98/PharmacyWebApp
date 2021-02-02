package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.dto.users.SupplierDto;
import isa.spring.boot.pharmacy.model.medicines.OfferState;

import java.util.Date;

public class OfferDto {

    private Long id;
    private double price;
    private Date deliveryDeadline;
    private OfferState offerState;
    private Long supplierId;
    private Long medicineOrderListId;
    private SupplierDto supplierDto;
    private MedicineOrderListDto medicineOrderList;

    public OfferDto() {
    }

    public OfferDto(Long id, double price, Date deliveryDeadline, OfferState offerState, Long supplierId,
                    Long medicineOrderListId, SupplierDto supplierDto, MedicineOrderListDto medicineOrderListDto) {
        this.id = id;
        this.price = price;
        this.deliveryDeadline = deliveryDeadline;
        this.offerState = offerState;
        this.supplierId = supplierId;
        this.medicineOrderListId = medicineOrderListId;
        this.supplierDto = supplierDto;
        this.medicineOrderList = medicineOrderListDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public OfferState getOfferState() {
        return offerState;
    }

    public void setOfferState(OfferState offerState) {
        this.offerState = offerState;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public Long getMedicineOrderListId() {
        return medicineOrderListId;
    }

    public void setMedicineOrderListId(Long medicineOrderListId) {
        this.medicineOrderListId = medicineOrderListId;
    }

    public SupplierDto getSupplierDto() {
        return supplierDto;
    }

    public void setSupplierDto(SupplierDto supplierDto) {
        this.supplierDto = supplierDto;
    }

    public MedicineOrderListDto getMedicineOrderList() {
        return medicineOrderList;
    }

    public void setMedicineOrderList(MedicineOrderListDto medicineOrderList) {
        this.medicineOrderList = medicineOrderList;
    }

    public Date getDeliveryDeadline() {
        return deliveryDeadline;
    }

    public void setDeliveryDeadline(Date deliveryDeadline) {
        this.deliveryDeadline = deliveryDeadline;
    }
}
