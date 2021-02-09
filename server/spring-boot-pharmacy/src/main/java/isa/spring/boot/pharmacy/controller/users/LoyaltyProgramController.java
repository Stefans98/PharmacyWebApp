package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.LoyaltyProgramDto;
import isa.spring.boot.pharmacy.mapper.users.LoyaltyProgramMapper;
import isa.spring.boot.pharmacy.model.users.LoyaltyProgram;
import isa.spring.boot.pharmacy.service.users.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/loyalty-program")
public class LoyaltyProgramController {

    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<LoyaltyProgramDto> defineLoyaltyProgram(@RequestBody LoyaltyProgramDto loyaltyProgramDto)
    {
        LoyaltyProgram loyaltyProgram = loyaltyProgramService.save(LoyaltyProgramMapper.convertToEntity(loyaltyProgramDto));
        return new ResponseEntity<>(LoyaltyProgramMapper.convertToDto(loyaltyProgram), HttpStatus.CREATED);
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<LoyaltyProgramDto> getLoyaltyProgram()
    {
        LoyaltyProgram loyaltyProgram = loyaltyProgramService.get();
        return new ResponseEntity<>(LoyaltyProgramMapper.convertToDto(loyaltyProgram), HttpStatus.CREATED);
    }
    @GetMapping(value = "/getDiscountByPatientCategory/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<Integer> getDiscountByPatientCategory(@PathVariable Long patientId)
    {
        return new ResponseEntity<>(loyaltyProgramService.getDiscountByPatientCategory(patientId), HttpStatus.OK);
    }
}
