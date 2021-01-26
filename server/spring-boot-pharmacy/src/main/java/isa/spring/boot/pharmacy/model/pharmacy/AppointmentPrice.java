package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.schedule.AppointmentType;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name="appointment_prices")
public class AppointmentPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "appointment_type", nullable = false)
    private AppointmentType appointmentType;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    // ***
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pricelist pricelist;

    public AppointmentPrice() {
    }

    public AppointmentPrice(double price, AppointmentType appointmentType, Date startTime, Date endTime) {
        this.price = price;
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

    public Pricelist getPricelist() {
        return pricelist;
    }

    public void setPricelist(Pricelist pricelist) {
        this.pricelist = pricelist;
    }
}
