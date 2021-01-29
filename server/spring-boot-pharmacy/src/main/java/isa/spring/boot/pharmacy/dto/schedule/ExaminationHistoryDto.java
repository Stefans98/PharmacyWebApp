package isa.spring.boot.pharmacy.dto.schedule;

public class ExaminationHistoryDto {

    private String patientFullName;
    private String dermatologisFullName;
    private String dateOfExamination;
    private String timePeriodOfExamination;

    public ExaminationHistoryDto() {
    }

    public String getPatientFullName() {
        return patientFullName;
    }

    public void setPatientFullName(String patientFullName) {
        this.patientFullName = patientFullName;
    }

    public String getDermatologisFullName() {
        return dermatologisFullName;
    }

    public void setDermatologisFullName(String dermatologisFullName) {
        this.dermatologisFullName = dermatologisFullName;
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
}
