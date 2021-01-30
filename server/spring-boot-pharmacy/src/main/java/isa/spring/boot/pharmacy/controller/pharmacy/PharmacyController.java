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
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<Pharmacy>> getAllPharmacies(){
        List<Pharmacy> pharmacies = pharmacyService.getAllPharmacies();
        return new ResponseEntity<>(pharmacies, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmacyByPharmacyAdmin/{pharmacyAdminId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<PharmacyDto> getPharmacyByPharmacyAdmin(@PathVariable Long pharmacyAdminId){
        PharmacyDto pharmacyDto = PharmacyMapper.convertToDto(pharmacyService.getPharmacyByPharmacyAdmin(pharmacyAdminId));
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }
}
