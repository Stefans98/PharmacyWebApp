package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;

public class OrderItemDto {

    private Long id;
    private MedicineDto medicine;
    private int quantity;

    public OrderItemDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedicineDto getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineDto medicine) {
        this.medicine = medicine;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
