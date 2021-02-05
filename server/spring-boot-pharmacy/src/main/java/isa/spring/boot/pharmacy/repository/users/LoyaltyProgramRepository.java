package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.LoyaltyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, Long> {
}
