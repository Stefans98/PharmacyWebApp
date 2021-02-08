package isa.spring.boot.pharmacy.dto.schedule;

import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;

import java.util.List;

public class AppointmentReportDto {

    private Long id;
    private String description;
    private AppointmentDto appointment;
    private List<PrescriptionDto> prescriptions;

    public AppointmentReportDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AppointmentDto getAppointment() {
        return appointment;
    }

    public void setAppointment(AppointmentDto appointment) {
        this.appointment = appointment;
    }

    public List<PrescriptionDto> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionDto> prescriptions) {
        this.prescriptions = prescriptions;
    }
}
