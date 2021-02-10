package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.dto.users.PharmacistDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.users.DermatologistDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.DermatologistMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/dermatologists")
public class DermatologistController {

    @Autowired
    UserService userService;

    @Autowired
    PharmacyService pharmacyService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<UserDto> registerDermatologist(@RequestBody UserDto dermatologistDto) {
        if (userService.findByEmail(dermatologistDto.getEmail()) != null) {
            throw new RuntimeException();
        }
        User dermatologist = userService.saveDermatologist(UserMapper.convertToEntity(dermatologistDto, false));

        return new ResponseEntity<>(UserMapper.convertToDto(dermatologist), HttpStatus.CREATED);
    }

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACY_ADMIN')")
    public ResponseEntity<DermatologistDto> getDermatologistById(@PathVariable Long id) {
        Dermatologist dermatologist = (Dermatologist)userService.findById(id);
        if (dermatologist == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(DermatologistMapper.convertToDto(dermatologist), HttpStatus.OK);
    }

    @PutMapping(value = "/updateProfile/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<DermatologistDto> updateDermatologist(@PathVariable(value = "id") Long dermatologistId, @RequestBody DermatologistDto dermatologistDto) throws  Exception{
        Dermatologist dermatologist = (Dermatologist)userService.findById(dermatologistId);
        if (dermatologist == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Dermatologist updatedDermatologist = userService.updateDermatologist(DermatologistMapper.convertToEntity(dermatologistDto, true));
        if (updatedDermatologist == null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(DermatologistMapper.convertToDto(updatedDermatologist), HttpStatus.OK);
    }

    @GetMapping(value = "/pharmaciesForDermatologist/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesForDermatologist(@PathVariable Long dermatologistId) {
        List<PharmacyDto> pharmaciesForDermatologist = new ArrayList<PharmacyDto>();
        if(pharmacyService.getPharmaciesForDermatologist(dermatologistId) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Pharmacy pharmacyForDermatologist : pharmacyService.getPharmaciesForDermatologist(dermatologistId)) {
            pharmaciesForDermatologist.add(PharmacyMapper.convertToDto(pharmacyForDermatologist));
        }
        if(pharmaciesForDermatologist.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pharmaciesForDermatologist, HttpStatus.OK);
    }

    @GetMapping(value = "/dermatologistsForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACY_ADMIN','PATIENT')")
    public ResponseEntity<List<DermatologistDto>> getDermatologistsForPharmacy(@PathVariable Long pharmacyId) {
        List<DermatologistDto> dermatologistsForPharmacy = new ArrayList<>();
        if(userService.getDermatologistsForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Dermatologist dermatologistForPharmacy : userService.getDermatologistsForPharmacy(pharmacyId)){
            dermatologistsForPharmacy.add(DermatologistMapper.convertToDto(dermatologistForPharmacy));
        }

        if(dermatologistsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(dermatologistsForPharmacy, HttpStatus.OK);
    }

    @GetMapping(value = "/patientsForDermatologist/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<Set<PatientDto>> getPatientsForDermatologist(@PathVariable Long dermatologistId) {
        Set<PatientDto> patientsForDermatologist = new HashSet<PatientDto>();
        for(Patient patient : userService.getPatientsForDermatologist(dermatologistId)) {
            patientsForDermatologist.add(PatientMapper.convertToDto(patient));
        }
        if(patientsForDermatologist.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(patientsForDermatologist, HttpStatus.OK);
    }

    @GetMapping(value = "/dermatologistsNotForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<DermatologistDto>> dermatologistsNotForPharmacy(@PathVariable Long pharmacyId) {
        List<DermatologistDto> dermatologistsNotForPharmacy = new ArrayList<>();
        if(userService.getDermatologistsNotForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Dermatologist dermatologistForPharmacy : userService.getDermatologistsNotForPharmacy(pharmacyId)){
            dermatologistsNotForPharmacy.add(DermatologistMapper.convertToDto(dermatologistForPharmacy));
        }

        if(dermatologistsNotForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(dermatologistsNotForPharmacy, HttpStatus.OK);
    }

    @PutMapping(value = "/hireDermatologist/{pharmacyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> hireDermatologist(@PathVariable Long pharmacyId, @RequestBody DermatologistDto dermatologistDto) throws  Exception{
       Dermatologist dermatologist = (Dermatologist) userService.findById(dermatologistDto.getId());
        if (dermatologist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Dermatologist hiredDermatologist = userService.hireDermatologist(dermatologist, pharmacyId);
        if (hiredDermatologist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/fireDermatologist/{pharmacyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> fireDermatologist(@PathVariable Long pharmacyId, @RequestBody DermatologistDto dermatologistDto) throws  Exception{
        Dermatologist dermatologist = (Dermatologist) userService.findById(dermatologistDto.getId());
        if (dermatologist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Dermatologist hiredDermatologist = userService.fireDermatologist(dermatologist, pharmacyId);
        if (hiredDermatologist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
