package isa.spring.boot.pharmacy.dto.users;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.users.ComplaintType;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.Pharmacist;

public class ComplaintDto {

    private Long id;
    private String text;
    private String complaintType;
    private Long patientId;
    private PatientDto patientDto;
    private Long dermatologistId;
    private DermatologistDto dermatologist;
    private Long pharmacyId;
    private PharmacyDto pharmacy;
    private Long pharmacistId;
    private PharmacistDto pharmacist;

    public ComplaintDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public PatientDto getPatientDto() {
        return patientDto;
    }

    public void setPatientDto(PatientDto patientDto) {
        this.patientDto = patientDto;
    }

    public Long getDermatologistId() {
        return dermatologistId;
    }

    public void setDermatologistId(Long dermatologistId) {
        this.dermatologistId = dermatologistId;
    }

    public DermatologistDto getDermatologist() {
        return dermatologist;
    }

    public void setDermatologist(DermatologistDto dermatologist) {
        this.dermatologist = dermatologist;
    }

    public Long getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(Long pharmacyId) {
        this.pharmacyId = pharmacyId;
    }

    public PharmacyDto getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(PharmacyDto pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Long getPharmacistId() {
        return pharmacistId;
    }

    public void setPharmacistId(Long pharmacistId) {
        this.pharmacistId = pharmacistId;
    }

    public PharmacistDto getPharmacist() {
        return pharmacist;
    }

    public void setPharmacist(PharmacistDto pharmacist) {
        this.pharmacist = pharmacist;
    }
}
