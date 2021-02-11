package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.RegistrationVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationVerificationTokenRepository extends JpaRepository<RegistrationVerificationToken, Long> {
    RegistrationVerificationToken findByToken(String token);
}
