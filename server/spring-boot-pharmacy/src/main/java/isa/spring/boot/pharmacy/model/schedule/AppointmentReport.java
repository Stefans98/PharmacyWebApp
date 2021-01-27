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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AppointmentHistory appointmentHistory;

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

    public AppointmentHistory getAppointmentHistory() {
        return appointmentHistory;
    }

    public void setAppointmentHistory(AppointmentHistory appointmentHistory) {
        this.appointmentHistory = appointmentHistory;
    }
}
