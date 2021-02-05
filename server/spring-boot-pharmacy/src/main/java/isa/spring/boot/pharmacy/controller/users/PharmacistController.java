package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.users.*;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.DermatologistMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/pharmacists")
public class PharmacistController {

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<PharmacistDto> getPharmacistById(@PathVariable Long id) {
        Pharmacist pharmacist = (Pharmacist)userService.findById(id);
        if (pharmacist == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(PharmacistMapper.convertToDto(pharmacist), HttpStatus.OK);
    }

    @PutMapping(value = "/updateProfile/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<PharmacistDto> updatePharmacist(@PathVariable(value = "id") Long pharmacistId, @RequestBody PharmacistDto pharmacistDto) throws  Exception{
        Pharmacist pharmacist = (Pharmacist)userService.findById(pharmacistId);
        if (pharmacist == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Pharmacist updatedPharmacist = userService.updatePharmacist(PharmacistMapper.convertToEntity(pharmacistDto, true));
        if (updatedPharmacist == null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(PharmacistMapper.convertToDto(updatedPharmacist), HttpStatus.OK);
    }

    @GetMapping(value = "/pharmacyForPharmacist/{pharmacistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<PharmacyDto> getPharmacyForPharmacist(@PathVariable Long pharmacistId) {
        if(pharmacyService.getPharmacyForPharmacist(pharmacistId) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Pharmacy pharmacyForPharmacist = pharmacyService.getPharmacyForPharmacist(pharmacistId);
        return new ResponseEntity<>(PharmacyMapper.convertToDto(pharmacyForPharmacist), HttpStatus.OK);
    }

    @GetMapping(value = "/getPharmacistsForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<PharmacistDto>> getPharmacistsForPharmacy(@PathVariable Long pharmacyId) {
        List<PharmacistDto> pharmacistsForPharmacy = new ArrayList<>();
        if(userService.getPharmacistsForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Pharmacist pharmacistForPharmacy : userService.getPharmacistsForPharmacy(pharmacyId)){
            pharmacistsForPharmacy.add(PharmacistMapper.convertToDto(pharmacistForPharmacy));
        }

        if(pharmacistsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pharmacistsForPharmacy, HttpStatus.OK);
    }

    @GetMapping(value = "/getAvailablePharmacistsForPharmacy", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PharmacistDto>> getAvailablePharmacistsForPharmacy(@RequestParam String reservationDate, @RequestParam String startTime,
                                                                                  @RequestParam String endTime, @RequestParam String pharmacyId) {
        List<PharmacistDto> availablePharmacistsForPharmacy = new ArrayList<>();
        if(userService.getAvailablePharmacistsForPharmacy(Long.parseLong(pharmacyId), reservationDate, startTime, endTime) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Pharmacist availablePharmacistForPharmacy : userService.getAvailablePharmacistsForPharmacy(Long.parseLong(pharmacyId), reservationDate, startTime, endTime)){
            availablePharmacistsForPharmacy.add(PharmacistMapper.convertToDto(availablePharmacistForPharmacy));
        }

        if(availablePharmacistsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(availablePharmacistsForPharmacy, HttpStatus.OK);
    }
}
