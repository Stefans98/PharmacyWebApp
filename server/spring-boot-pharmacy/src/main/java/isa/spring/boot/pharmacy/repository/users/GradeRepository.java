package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
