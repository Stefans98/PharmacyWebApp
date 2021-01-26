package isa.spring.boot.pharmacy.model.schedule;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="appointment_histories")
public class AppointmentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    private List<AppointmentReport> appointmentReports;

    public AppointmentHistory() {
    }

    public AppointmentHistory(List<AppointmentReport> appointmentReports) {
        this.appointmentReports = appointmentReports;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<AppointmentReport> getAppointmentReports() {
        return appointmentReports;
    }

    public void setAppointmentReports(List<AppointmentReport> appointmentReports) {
        this.appointmentReports = appointmentReports;
    }
}
