package isa.spring.boot.pharmacy.listeners;

import isa.spring.boot.pharmacy.events.SignupCompletedEvent;
import isa.spring.boot.pharmacy.model.users.RegistrationVerificationToken;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.users.RegistrationVerificationTokenRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.users.RegistrationVerificationTokenService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SignupListener implements ApplicationListener<SignupCompletedEvent> {

    @Autowired
    private RegistrationVerificationTokenService registrationVerificationTokenService;

    @Autowired
    private EmailService emailService;

    @Override
    public void onApplicationEvent(SignupCompletedEvent signupCompletedEvent) {
        this.confirmRegistration(signupCompletedEvent);
    }

    private void confirmRegistration(SignupCompletedEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        registrationVerificationTokenService.save(new RegistrationVerificationToken(token, user));

        String confirmationUrl
                = event.getAppUrl() + "/api/auth/confirmRegistration?token=" + token;
        String text = "Poštovani/-a, <br><br> Aktivirajte svoj nalog selektovanjem linka: " +
                "http://localhost:8081" + confirmationUrl + "<br><br>S poštovanjem, <br>Vaša ISA";

        emailService.sendEmailAsync(null, "Potvrda registracije", text);
    }
}
