package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.mapper.users.UserMapper;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineDto>> getMedicines() {
        List<MedicineDto> medicineDto = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.findAll()) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }

    @GetMapping(value = "/findMedicinesBy/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineDto>> findMedicinesBy(@PathVariable String name) {
        List<MedicineDto> medicineDto = new ArrayList<>();
        for(Medicine medicine : medicineService.findMedicinesBy(name)) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }

        if(medicineDto.isEmpty()){
            return new ResponseEntity<>(medicineDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }
}
