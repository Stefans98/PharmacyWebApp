package isa.spring.boot.pharmacy.dto.schedule;

public class ExaminationDto {

    private String patientFullName;
    private String dermatologistFullName;
    private String dateOfExamination;
    private String timePeriodOfExamination;
    private String pharmacyName;
    private double price;

    public ExaminationDto() {
    }

    public String getPatientFullName() {
        return patientFullName;
    }

    public void setPatientFullName(String patientFullName) {
        this.patientFullName = patientFullName;
    }

    public String getDermatologistFullName() {
        return dermatologistFullName;
    }

    public void setDermatologistFullName(String dermatologistFullName) {
        this.dermatologistFullName = dermatologistFullName;
    }

    public String getDateOfExamination() {
        return dateOfExamination;
    }

    public void setDateOfExamination(String dateOfExamination) {
        this.dateOfExamination = dateOfExamination;
    }

    public String getTimePeriodOfExamination() {
        return timePeriodOfExamination;
    }

    public void setTimePeriodOfExamination(String timePeriodOfExamination) {
        this.timePeriodOfExamination = timePeriodOfExamination;
    }

    public String getPharmacyName() {
        return pharmacyName;
    }

    public void setPharmacyName(String pharmacyName) {
        this.pharmacyName = pharmacyName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
