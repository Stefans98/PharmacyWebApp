package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.VacationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRepository extends JpaRepository<VacationRequest, Long> {
}
