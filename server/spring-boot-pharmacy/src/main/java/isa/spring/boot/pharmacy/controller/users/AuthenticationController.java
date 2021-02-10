package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.dto.users.UserLoginDto;
import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.dto.users.UserTokenDto;
import isa.spring.boot.pharmacy.events.SignupCompletedEvent;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.RegistrationVerificationToken;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.security.authentication.TokenUtils;
import isa.spring.boot.pharmacy.service.users.RegistrationVerificationTokenService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;

@RestController
@RequestMapping(value="api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private RegistrationVerificationTokenService registrationVerificationTokenService;

    @PostMapping("/login")
    public ResponseEntity<UserTokenDto> createAuthenticationToken(@RequestBody UserLoginDto userLoginDto,
                                                                  HttpServletResponse response) {

        Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(),
                            userLoginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        if (user.getDiscriminatorValue().equals("PATIENT")) {
            Patient patient = (Patient) Hibernate.unproxy(user);
            if (!patient.isAccountActivated()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return ResponseEntity.ok(new UserTokenDto(tokenUtils.generateToken(user.getId(), user.getEmail(),
                                user.getDiscriminatorValue()), tokenUtils.getExpiresIn()));
    }

    @PostMapping("/signupPatient")
    public ResponseEntity<PatientDto> registerPatient(@RequestBody PatientDto patientDto, HttpServletRequest request)
    {
        if (userService.findByEmail(patientDto.getEmail()) != null)
        {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Patient patient = userService.savePatient(PatientMapper.convertToEntity(patientDto, false));

        eventPublisher.publishEvent(new SignupCompletedEvent(request.getContextPath(), request.getLocale(), patient));
        return new ResponseEntity<>(PatientMapper.convertToDto(patient), HttpStatus.CREATED);
    }

    @GetMapping("/confirmRegistration")
    public String confirmRegistration(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        RegistrationVerificationToken verificationToken = registrationVerificationTokenService.getToken(token);
        if (verificationToken == null) {
            return "Neispravan token!";
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return "Vaš token je istekao";
        }

        userService.activatePatientAccount(user.getEmail());
        response.sendRedirect( "http://localhost:4200/login");
        return "Uspešna aktivacija naloga";
    }
}
