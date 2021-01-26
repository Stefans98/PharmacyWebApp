package isa.spring.boot.pharmacy.model.schedule;

import javax.persistence.*;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="appointment_reports")
public class AppointmentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "description", nullable = false)
    private String description;

    private Appointment appointment;

    public AppointmentReport() {
    }

    public AppointmentReport(Appointment appointment, String description) {
        this.description = description;
        this.appointment = appointment;
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

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
