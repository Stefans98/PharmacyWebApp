package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.PharmacyMedicineDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.mapper.medicines.PharmacyMedicineMapper;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.service.medicines.PharmacyMedicineService;
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
@RequestMapping(value = "api/pharmacyMedicines")
public class PharmacyMedicineController {

    @Autowired
    PharmacyMedicineService pharmacyMedicineService;

    @Autowired
    PharmacyService pharmacyService;

    @GetMapping(value = "/getMedicinesForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACY_ADMIN', 'PATIENT')")
    public ResponseEntity<List<PharmacyMedicineDto>> getMedicinesForPharmacy(@PathVariable Long pharmacyId) {
        List<PharmacyMedicineDto> pharmacyMedicines = new ArrayList<>();
        if(pharmacyMedicineService.getMedicinesForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineService.getMedicinesForPharmacy(pharmacyId)) {
            pharmacyMedicines.add(PharmacyMedicineMapper.convertToDto(pharmacyMedicine));
        }
        if(pharmacyMedicines.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(pharmacyMedicines, HttpStatus.OK);
    }

    @PostMapping(value = "/addPharmacyMedicine", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> addPharmacyMedicine(@RequestBody PharmacyMedicineDto pharmacyMedicineDto) {
        PharmacyMedicine pharmacyMedicine = PharmacyMedicineMapper.convertToEntity(pharmacyMedicineDto, false);
        if(pharmacyMedicine == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PharmacyMedicine updatedPharmacyMedicine = pharmacyMedicineService.addPharmacyMedicine(pharmacyMedicine);
        if(updatedPharmacyMedicine == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/deletePharmacyMedicine/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> deletePharmacyMedicine(@RequestBody PharmacyMedicineDto pharmacyMedicineDto, @PathVariable Long pharmacyId) {
        PharmacyMedicine pharmacyMedicine = PharmacyMedicineMapper.convertToEntity(pharmacyMedicineDto, true);
        if(pharmacyMedicine == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PharmacyMedicine deletedPharmacyMedicine = pharmacyMedicineService.deletePharmacyMedicine(pharmacyMedicine, pharmacyId);
        if(deletedPharmacyMedicine == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
