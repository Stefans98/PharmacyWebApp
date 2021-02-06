package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.mapper.schedule.WorkDayMapper;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.service.schedule.WorkDayService;
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

    @GetMapping(value = "/getWorkDayInPharmacyByDateAndEmployeeId", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('PATIENT','PHARMACY_ADMIN')")
    public ResponseEntity<WorkDayDto> getWorkDayInPharmacyByDateAndEmployeeId(@RequestParam String date, @RequestParam String employeeId, @RequestParam String pharmacyId) {
        WorkDay workDay = workDayService.getWorkDayInPharmacyByDateAndEmployeeId(date, employeeId, pharmacyId);
        if(workDay == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(WorkDayMapper.convertToDto(workDay), HttpStatus.OK);
    }
}
