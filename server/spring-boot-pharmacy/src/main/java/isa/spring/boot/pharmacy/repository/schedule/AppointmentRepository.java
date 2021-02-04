package isa.spring.boot.pharmacy.repository.schedule;

import isa.spring.boot.pharmacy.model.schedule.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findById(long id);
}
