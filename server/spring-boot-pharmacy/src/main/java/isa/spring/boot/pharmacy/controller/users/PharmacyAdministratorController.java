package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.PharmacyAdministratorDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.users.PharmacyAdministratorMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/pharmacy-admins")
public class PharmacyAdministratorController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> registerSupplier(@RequestBody PharmacyAdministratorDto pharmacyAdministratorDto)
    {
        if (userService.findByEmail(pharmacyAdministratorDto.getEmail()) != null)
        {
            throw new RuntimeException();
        }
        User pharmacyAdministrator = userService.savePharmacyAdministrator(PharmacyAdministratorMapper.convertToEntity(pharmacyAdministratorDto, false)
                    , pharmacyAdministratorDto.getPharmacyId());

        return new ResponseEntity<>(UserMapper.convertToDto(pharmacyAdministrator), HttpStatus.CREATED);
    }
}
