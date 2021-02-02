package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.users.Patient;

public class PrescriptionDto {

    private Long id;
    private MedicineDto medicine;
    private PatientDto patient;
    private int therapyDayLength;
    private Long pharmacyId;

    public PrescriptionDto() {
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

    public PatientDto getPatient() {
        return patient;
    }

    public void setPatient(PatientDto patient) {
        this.patient = patient;
    }

    public int getTherapyDayLength() {
        return therapyDayLength;
    }

    public void setTherapyDayLength(int therapyDayLength) {
        this.therapyDayLength = therapyDayLength;
    }

    public Long getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(Long pharmacyId) {
        this.pharmacyId = pharmacyId;
    }
}
