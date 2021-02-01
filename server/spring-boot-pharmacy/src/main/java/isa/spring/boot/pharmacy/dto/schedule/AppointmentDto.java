package isa.spring.boot.pharmacy.dto.schedule;

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
    private Patient patient;
    private WorkDay workDay;
    private AppointmentReport appointmentReport;
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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public WorkDay getWorkDay() {
        return workDay;
    }

    public void setWorkDay(WorkDay workDay) {
        this.workDay = workDay;
    }

    public AppointmentReport getAppointmentReport() {
        return appointmentReport;
    }

    public void setAppointmentReport(AppointmentReport appointmentReport) {
        this.appointmentReport = appointmentReport;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
