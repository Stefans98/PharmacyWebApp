package isa.spring.boot.pharmacy.dto.medicines;

import java.util.Date;

public class MedicineReservationDto {
    private Long id;
    private Date finalPurchasingDate;
    private boolean isCanceled;
    private Long medicineId;
    private Long pharmacyId;
    private Long patientId;

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
}
