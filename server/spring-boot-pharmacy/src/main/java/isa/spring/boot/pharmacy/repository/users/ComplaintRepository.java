package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
