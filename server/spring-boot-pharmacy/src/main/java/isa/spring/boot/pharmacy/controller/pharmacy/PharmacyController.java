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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/pharmacies")
public class PharmacyController {

    @Autowired
    PharmacyService pharmacyService;

    @GetMapping(value="/getAllPharmacies", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PATIENT', 'PHARMACY_ADMIN')")
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
}
