package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.UserLoginDto;
import isa.spring.boot.pharmacy.dto.users.UserRegistrationDto;
import isa.spring.boot.pharmacy.dto.users.UserTokenDto;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.security.authentication.TokenUtils;
import isa.spring.boot.pharmacy.service.users.UserService;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;

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

        Authentication authentication = null;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(),
                            userLoginDto.getPassword()));
        } catch (Exception e) {

        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new UserTokenDto(tokenUtils.generateToken(user.getEmail()),
                                                        tokenUtils.getExpiresIn()));
    }

    /*@PostMapping("/signup")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserRegistrationDto userRegistrationDto)
    {
        if (userService.findByEmail(userRegistrationDto.getEmail()) == null)
        {
            throw new Exception();
        }
    }*/
}
