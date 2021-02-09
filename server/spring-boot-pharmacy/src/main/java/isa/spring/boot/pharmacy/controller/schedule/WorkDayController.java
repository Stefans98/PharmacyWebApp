package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.mapper.schedule.WorkDayMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.schedule.WorkDayService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/workdays")
public class WorkDayController {

    @Autowired
    WorkDayService workDayService;

    @Autowired
    UserService userService;

    @Autowired
    PharmacyService pharmacyService;

    @GetMapping(value = "/getWorkDayInPharmacyByDateAndEmployeeId", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('PATIENT','DERMATOLOGIST','PHARMACIST','PHARMACY_ADMIN')")
    public ResponseEntity<WorkDayDto> getWorkDayInPharmacyByDateAndEmployeeId(@RequestParam String date, @RequestParam String employeeId, @RequestParam String pharmacyId) {
        WorkDay workDay = workDayService.getWorkDayInPharmacyByDateAndEmployeeId(date, employeeId, pharmacyId);
        if(workDay == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(WorkDayMapper.convertToDto(workDay), HttpStatus.OK);
    }

    @PostMapping(value="/defineWorkDayForDermatologist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> defineWorkDayForDermatologist(@RequestBody WorkDayDto workDayDto){
        Dermatologist dermatologist = (Dermatologist) userService.findById(workDayDto.getEmployee().getId());
        Pharmacy pharmacy = pharmacyService.getPharmacyById(workDayDto.getPharmacy().getId());
        WorkDay workDay = WorkDayMapper.convertToEntity(workDayDto, dermatologist, pharmacy);
        WorkDay savedWorkDay = workDayService.definingWorkDayForDermatologist(workDay, workDayDto, dermatologist, pharmacy);
        if(savedWorkDay == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value="/defineWorkDayForPharmacist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> defineWorkDayForPharmacist(@RequestBody WorkDayDto workDayDto){
        Pharmacist pharmacist = (Pharmacist) userService.findById(workDayDto.getEmployee().getId());
        Pharmacy pharmacy = pharmacyService.getPharmacyById(workDayDto.getPharmacy().getId());
        WorkDay workDay = WorkDayMapper.convertToEntity(workDayDto, pharmacist, pharmacy);
        WorkDay savedWorkDay = workDayService.definingWorkDayForPharmacist(workDay, workDayDto, pharmacist, pharmacy);
        if(savedWorkDay == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
