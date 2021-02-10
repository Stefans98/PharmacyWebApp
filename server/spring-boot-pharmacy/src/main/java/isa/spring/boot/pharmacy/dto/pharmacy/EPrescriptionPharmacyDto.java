package isa.spring.boot.pharmacy.dto.pharmacy;

public class EPrescriptionPharmacyDto {

    private PharmacyDto pharmacy;
    private double price;

    public EPrescriptionPharmacyDto() {
    }

    public PharmacyDto getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(PharmacyDto pharmacy) {
        this.pharmacy = pharmacy;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
