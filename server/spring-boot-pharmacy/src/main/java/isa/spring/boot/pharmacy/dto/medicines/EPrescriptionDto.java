package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionState;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import java.util.*;

public class EPrescriptionDto {

    private Long id;
    private String code;
    private Date issuingDate;
    private double price;
    private Long pharmacyId;
    private PharmacyDto pharmacy;
    private Long patientId;
    private PatientDto patient;
    private List<EPrescriptionItemDto> items;
    private EPrescriptionState ePrescriptionState;

    public EPrescriptionDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getIssuingDate() {
        return issuingDate;
    }

    public void setIssuingDate(Date issuingDate) {
        this.issuingDate = issuingDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public PatientDto getPatient() {
        return patient;
    }

    public void setPatient(PatientDto patient) {
        this.patient = patient;
    }

    public List<EPrescriptionItemDto> getItems() {
        return items;
    }

    public void setItems(List<EPrescriptionItemDto> items) {
        this.items = items;
    }

    public HashMap<String, Integer> getMedicineCodesWithQuantities() {
        HashMap<String, Integer> codes = new HashMap<>();
        for (EPrescriptionItemDto item : getItems()) {
            codes.put(item.getMedicineCode(), item.getQuantity());
        }
        return codes;
    }

    public EPrescriptionState getePrescriptionState() {
        return ePrescriptionState;
    }

    public void setePrescriptionState(EPrescriptionState ePrescriptionState) {
        this.ePrescriptionState = ePrescriptionState;
    }
}
