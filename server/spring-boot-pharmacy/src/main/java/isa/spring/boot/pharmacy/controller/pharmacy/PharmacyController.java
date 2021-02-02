package isa.spring.boot.pharmacy.controller.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/pharmacies")
public class PharmacyController {

    @Autowired
    PharmacyService pharmacyService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<PharmacyDto> registerPharmacy(@RequestBody PharmacyDto pharmacyDto)
    {
        Pharmacy pharmacy = pharmacyService.savePharmacy(PharmacyMapper.convertToEntity(pharmacyDto));

        return new ResponseEntity<>(PharmacyMapper.convertToDto(pharmacy), HttpStatus.CREATED);
    }

    @GetMapping(value="/getAllPharmacies", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PATIENT', 'PHARMACY_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<List<PharmacyDto>> getAllPharmacies() {
        List<PharmacyDto> pharmacyDto = new ArrayList<>();
        for(Pharmacy pharmacy :  pharmacyService.getAllPharmacies()) {
            pharmacyDto.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if (pharmacyDto.isEmpty()) {
            return new ResponseEntity<>(pharmacyDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmaciesByMedicineId/{medicineId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesByMedicineId(@PathVariable Long medicineId){
        List<PharmacyDto> pharmacyDto = new ArrayList<>();
        for(Pharmacy pharmacy :  pharmacyService.getPharmaciesByMedicineId(medicineId)) {
            pharmacyDto.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if (pharmacyDto.isEmpty()) {
            return new ResponseEntity<>(pharmacyDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmacyByPharmacyAdmin/{pharmacyAdminId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<PharmacyDto> getPharmacyByPharmacyAdmin(@PathVariable Long pharmacyAdminId){
        PharmacyDto pharmacyDto = PharmacyMapper.convertToDto(pharmacyService.getPharmacyByPharmacyAdmin(pharmacyAdminId));
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmaciesByDermatologist/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesByDermatologist(@PathVariable Long dermatologistId){
        List<PharmacyDto> pharmaciesForDermatologist = new ArrayList<>();
        if(pharmacyService.getPharmaciesForDermatologist(dermatologistId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Pharmacy pharmacy : pharmacyService.getPharmaciesForDermatologist(dermatologistId)){
            pharmaciesForDermatologist.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if(pharmaciesForDermatologist.isEmpty()){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(pharmaciesForDermatologist, HttpStatus.OK);
    }
}
