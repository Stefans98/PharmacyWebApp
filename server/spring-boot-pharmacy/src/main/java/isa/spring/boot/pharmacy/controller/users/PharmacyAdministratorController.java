package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.PharmacyAdministratorDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacyAdministratorMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/pharmacy-admins")
public class PharmacyAdministratorController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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

    @PutMapping(value = "/updateProfile/{pharmacyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> updatePharmacyAdministrator(@PathVariable Long pharmacyId, @RequestBody PharmacyAdministratorDto pharmacyAdministratorDto)
    {
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator)userService.findById(pharmacyAdministratorDto.getId());
        if (pharmacyAdministrator == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PharmacyAdministrator updatedPharmacyAdministrator = userService.updatePharmacyAdministrator(PharmacyAdministratorMapper.convertToEntity(pharmacyAdministratorDto, true), pharmacyId);
        if (updatedPharmacyAdministrator == null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
