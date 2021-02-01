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
@RequestMapping(value = "/api/suppliers")
public class SupplierController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE ,produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> registerSupplier(@RequestBody UserDto supplierDto)
    {
        if (userService.findByEmail(supplierDto.getEmail()) != null)
        {
            throw new RuntimeException();
        }
        User supplier = userService.saveSupplier(UserMapper.convertToEntity(supplierDto, false));

        return new ResponseEntity<>(UserMapper.convertToDto(supplier), HttpStatus.CREATED);
    }

    @PostMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE ,produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<UserDto> updateSupplier(@RequestBody UserDto supplierDto)
    {
        if (userService.findById(supplierDto.getId()) == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User supplier = userService.updateSupplier(UserMapper.convertToEntity(supplierDto, true));

        return new ResponseEntity<>(UserMapper.convertToDto(supplier), HttpStatus.OK);
    }
}
