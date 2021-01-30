package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.dto.users.UserLoginDto;
import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.dto.users.UserTokenDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.security.authentication.TokenUtils;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value="api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserTokenDto> createAuthenticationToken(@RequestBody UserLoginDto userLoginDto,
                                                                  HttpServletResponse response) {

        Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(),
                            userLoginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new UserTokenDto(tokenUtils.generateToken(user.getId(), user.getEmail(),
                                user.getDiscriminatorValue()), tokenUtils.getExpiresIn()));
    }

    @PostMapping("/signupPatient")
    public ResponseEntity<PatientDto> registerPatient(@RequestBody PatientDto patientDto)
    {
        if (userService.findByEmail(patientDto.getEmail()) != null)
        {
            throw new RuntimeException();
        }
        Patient patient = userService.savePatient(PatientMapper.convertToEntity(patientDto, false));

        return new ResponseEntity<>(PatientMapper.convertToDto(patient), HttpStatus.CREATED);
    }
}
