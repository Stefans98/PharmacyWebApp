package isa.spring.boot.pharmacy.repository.schedule;

import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkDayRepository extends JpaRepository<WorkDay, Long> {
    WorkDay findById(long id);
}
