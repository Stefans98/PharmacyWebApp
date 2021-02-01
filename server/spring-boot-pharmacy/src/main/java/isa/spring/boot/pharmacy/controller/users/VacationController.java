package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.VacationDto;
import isa.spring.boot.pharmacy.mapper.users.VacationMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Employee;
import isa.spring.boot.pharmacy.model.users.VacationRequest;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import isa.spring.boot.pharmacy.service.users.VacationService;
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
@RequestMapping(value = "api/vacations")
public class VacationController {

    @Autowired
    private VacationService vacationService;

    @PostMapping(value = "/sendVacationRequest", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACIST','DERMATOLOGIST')")
    public ResponseEntity<VacationDto> saveVacationRequest(@RequestBody VacationDto vacationDto)
    {
        VacationRequest vacationRequest = vacationService.saveVacation(VacationMapper.convertToEntity(vacationDto), vacationDto.getEmployeeId(), vacationDto.getPharmacyId());
        return new ResponseEntity<>(VacationMapper.convertToDto(vacationRequest), HttpStatus.CREATED);
    }
}
