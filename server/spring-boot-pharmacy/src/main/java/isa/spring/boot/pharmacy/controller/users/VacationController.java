package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.DermatologistDto;
import isa.spring.boot.pharmacy.dto.users.VacationDto;
import isa.spring.boot.pharmacy.mapper.users.DermatologistMapper;
import isa.spring.boot.pharmacy.mapper.users.VacationMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
        if(vacationRequest == null) {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(VacationMapper.convertToDto(vacationRequest), HttpStatus.CREATED);
    }

    @GetMapping(value = "/getVacationRequestsForDermatologist/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<VacationDto>> getVacationRequestsForDermatologist(@PathVariable Long pharmacyId) {
        List<VacationDto> vacationDtos = new ArrayList<>();
        if(vacationService.getVacationRequestByPharmacyAndDermatologists(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(VacationRequest vacationRequest : vacationService.getVacationRequestByPharmacyAndDermatologists(pharmacyId)){
            vacationDtos.add(VacationMapper.convertToDto(vacationRequest));
        }

        if(vacationDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(vacationDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/getVacationRequestsForPharmacists/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<VacationDto>> getVacationRequestsForPharmacists(@PathVariable Long pharmacyId) {
        List<VacationDto> vacationDtos = new ArrayList<>();
        if(vacationService.getVacationRequestByPharmacyAndPharmacists(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(VacationRequest vacationRequest : vacationService.getVacationRequestByPharmacyAndPharmacists(pharmacyId)){
            vacationDtos.add(VacationMapper.convertToDto(vacationRequest));
        }

        if(vacationDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(vacationDtos, HttpStatus.OK);
    }

    @PutMapping(value = "/acceptVacationRequest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> acceptVacationRequest(@RequestBody VacationDto vacationRequestDto){
        VacationRequest vacationRequest = vacationService.acceptVacationRequest(VacationMapper.convertToEntity(vacationRequestDto), vacationRequestDto.getEmployeeId(), vacationRequestDto.getPharmacyId());
        if(vacationRequest == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/rejectVacationRequest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> rejectVacationRequest(@RequestParam String text, @RequestBody VacationDto vacationRequestDto){
        VacationRequest vacationRequest = vacationService.rejectVacationRequest(VacationMapper.convertToEntity(vacationRequestDto), text, vacationRequestDto.getEmployeeId(), vacationRequestDto.getPharmacyId());
        if(vacationRequest == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
