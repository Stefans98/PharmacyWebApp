package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/system-admins")
public class SystemAdministratorController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> getSysAdminById(@PathVariable Long id) {
        User sysAdmin =  userService.findById(id);
        if (sysAdmin == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(UserMapper.convertToDto(sysAdmin), HttpStatus.OK);
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> registerSupplier(@RequestBody UserDto systemAdministratorDto)
    {
        if (userService.findByEmail(systemAdministratorDto.getEmail()) != null)
        {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User systemAdministrator = userService.saveSystemAdministrator(UserMapper.convertToEntity(systemAdministratorDto, false));

        return new ResponseEntity<>(UserMapper.convertToDto(systemAdministrator), HttpStatus.CREATED);
    }

}
