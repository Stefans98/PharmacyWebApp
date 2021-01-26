package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.schedule.AppointmentType;
import isa.spring.boot.pharmacy.model.schedule.TimePeriod;

import javax.persistence.*;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

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

    private TimePeriod timePeriod;

    public AppointmentPrice() {
    }

    public AppointmentPrice(double price, AppointmentType appointmentType, TimePeriod timePeriod) {
        this.price = price;
        this.appointmentType = appointmentType;
        this.timePeriod = timePeriod;
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

    public TimePeriod getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(TimePeriod timePeriod) {
        this.timePeriod = timePeriod;
    }
}
