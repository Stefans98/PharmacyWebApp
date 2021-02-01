package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;

import java.util.Date;

public class MedicineReservationDto {
    private Long id;
    private Date finalPurchasingDate;
    private boolean isCanceled;
    private Long medicineId;
    private Long pharmacyId;
    private Long patientId;
    private MedicineDto medicine;
    private PharmacyDto pharmacy;
    private double medicinePrice;

    public MedicineReservationDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFinalPurchasingDate() {
        return finalPurchasingDate;
    }

    public void setFinalPurchasingDate(Date finalPurchasingDate) {
        this.finalPurchasingDate = finalPurchasingDate;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public Long getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(Long pharmacyId) {
        this.pharmacyId = pharmacyId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public MedicineDto getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineDto medicine) {
        this.medicine = medicine;
    }

    public PharmacyDto getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(PharmacyDto pharmacy) {
        this.pharmacy = pharmacy;
    }

    public double getMedicinePrice() {
        return medicinePrice;
    }

    public void setMedicinePrice(double medicinePrice) {
        this.medicinePrice = medicinePrice;
    }
}
