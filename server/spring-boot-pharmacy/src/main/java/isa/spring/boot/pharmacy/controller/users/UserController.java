package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.ResetPasswordDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.users.ResetPasswordMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PATIENT','PHARMACIST','DERMATOLOGIST','SUPPLIER','PHARMACY_ADMIN','SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(UserMapper.convertToDto(user), HttpStatus.OK);
    }

    @GetMapping(value = "/getPasswordResetDataForUser/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PATIENT','PHARMACIST','DERMATOLOGIST','SUPPLIER','PHARMACY_ADMIN','SYSTEM_ADMIN')")
    public ResponseEntity<ResetPasswordDto> getPasswordResetDataForUser(@PathVariable Long userId) {
        User user = userService.findById(userId);
        if (user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ResetPasswordMapper.convertToDto(user), HttpStatus.OK);
    }

}
