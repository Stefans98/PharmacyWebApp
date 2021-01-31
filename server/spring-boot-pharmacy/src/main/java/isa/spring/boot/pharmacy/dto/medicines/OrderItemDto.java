package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;

public class OrderItemDto {

    private MedicineDto medicine;
    private int quantity;

    public OrderItemDto() {
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
