package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.RegistrationVerificationToken;
import isa.spring.boot.pharmacy.repository.users.RegistrationVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationVerificationTokenService {

    @Autowired
    private RegistrationVerificationTokenRepository registrationVerificationTokenRepository;

    public RegistrationVerificationToken save(RegistrationVerificationToken token) {
        return this.registrationVerificationTokenRepository.save(token);
    }

    public RegistrationVerificationToken getToken(String token) {
        return this.registrationVerificationTokenRepository.findByToken(token);
    }
}
