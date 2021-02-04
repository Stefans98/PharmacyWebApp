package isa.spring.boot.pharmacy.dto.schedule;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.Patient;
import java.util.Date;

public class AppointmentDto {

    private Long id;
    private int appointmentType;
    private int appointmentState;
    private Date startTime;
    private Date endTime;
    private PatientDto patient;
    private WorkDayDto workDay;
    private AppointmentReportDto appointmentReport;
    private double price;

    public AppointmentDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(int appointmentType) {
        this.appointmentType = appointmentType;
    }

    public int getAppointmentState() {
        return appointmentState;
    }

    public void setAppointmentState(int appointmentState) {
        this.appointmentState = appointmentState;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public PatientDto getPatient() {
        return patient;
    }

    public void setPatient(PatientDto patient) {
        this.patient = patient;
    }

    public WorkDayDto getWorkDay() {
        return workDay;
    }

    public void setWorkDay(WorkDayDto workDay) {
        this.workDay = workDay;
    }

    public AppointmentReportDto getAppointmentReport() {
        return appointmentReport;
    }

    public void setAppointmentReport(AppointmentReportDto appointmentReport) {
        this.appointmentReport = appointmentReport;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
