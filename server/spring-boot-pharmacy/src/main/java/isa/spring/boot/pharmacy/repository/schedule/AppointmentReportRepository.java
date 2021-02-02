package isa.spring.boot.pharmacy.repository.schedule;

import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentReportRepository extends JpaRepository<AppointmentReport, Long> {
}
