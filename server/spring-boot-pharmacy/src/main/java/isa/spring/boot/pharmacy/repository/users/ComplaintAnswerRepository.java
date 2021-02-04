package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.ComplaintAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintAnswerRepository extends JpaRepository<ComplaintAnswer, Long> {
}
