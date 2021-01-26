package isa.spring.boot.pharmacy.model.schedule;

import isa.spring.boot.pharmacy.model.users.User;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "appointment_state", nullable = false)
    private AppointmentState appointmentState;

    @Column(name = "appointment_type", nullable = false)
    private AppointmentType appointmentType;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    // ***
    @OneToOne(mappedBy = "appointment")
    private AppointmentReport appointmentReport;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private WorkDay workDay;

    public Appointment() {
    }

    public Appointment(double price, AppointmentState appointmentState, AppointmentType appointmentType, Date startTime, Date endTime) {
        this.price = price;
        this.appointmentState = appointmentState;
        this.appointmentType = appointmentType;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public AppointmentState getAppointmentState() {
        return appointmentState;
    }

    public void setAppointmentState(AppointmentState appointmentState) {
        this.appointmentState = appointmentState;
    }

    public AppointmentType getAppointmentType() {
        return appointmentType;
    }

    public void setAppointmentType(AppointmentType appointmentType) {
        this.appointmentType = appointmentType;
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

    public AppointmentReport getAppointmentReport() {
        return appointmentReport;
    }

    public void setAppointmentReport(AppointmentReport appointmentReport) {
        this.appointmentReport = appointmentReport;
    }

    public WorkDay getWorkDay() {
        return workDay;
    }

    public void setWorkDay(WorkDay workDay) {
        this.workDay = workDay;
    }
}
