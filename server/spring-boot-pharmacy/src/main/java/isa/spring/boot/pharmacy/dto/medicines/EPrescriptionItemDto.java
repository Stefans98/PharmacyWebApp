package isa.spring.boot.pharmacy.dto.medicines;

public class EPrescriptionItemDto {

    private String medicineCode;
    private String medicineName;
    private int quantity;

    public EPrescriptionItemDto() {
    }

    public EPrescriptionItemDto(String medicineCode, String medicineName, int quantity) {
        this.medicineCode = medicineCode;
        this.medicineName = medicineName;
        this.quantity = quantity;
    }

    public String getMedicineCode() {
        return medicineCode;
    }

    public void setMedicineCode(String medicineCode) {
        this.medicineCode = medicineCode;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
