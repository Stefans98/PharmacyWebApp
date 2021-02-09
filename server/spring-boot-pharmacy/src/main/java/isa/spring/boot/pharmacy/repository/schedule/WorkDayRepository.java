package isa.spring.boot.pharmacy.repository.schedule;

import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkDayRepository extends JpaRepository<WorkDay, Long> {
    WorkDay findById(long id);
    List<WorkDay> findByEmployeeId(long employeeId);
}
