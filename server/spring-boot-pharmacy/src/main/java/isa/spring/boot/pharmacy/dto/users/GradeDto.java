package isa.spring.boot.pharmacy.dto.users;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;

public class GradeDto {

    private Long id;
    private int grade;
    private String gradeType;
    private Long patientId;
    private PatientDto patient;
    private Long dermatologistId;
    private DermatologistDto dermatologist;
    private Long pharmacyId;
    private PharmacyDto pharmacy;
    private Long pharmacistId;
    private PharmacistDto pharmacist;
    private Long medicineId;
    private MedicineDto medicine;

    public GradeDto() {
    }

    public GradeDto(Long id, int grade) {
        this.id = id;
        this.grade = grade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getGradeType() {
        return gradeType;
    }

    public void setGradeType(String gradeType) {
        this.gradeType = gradeType;
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

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public MedicineDto getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineDto medicine) {
        this.medicine = medicine;
    }
}
