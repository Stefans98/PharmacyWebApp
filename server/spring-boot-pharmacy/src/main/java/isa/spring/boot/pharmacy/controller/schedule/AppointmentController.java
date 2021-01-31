package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.mapper.schedule.ExaminationMapper;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
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
@RequestMapping(value="api/appointments")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping(value = "/getExaminationsHistoryForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<ExaminationDto>> getExaminationsHistoryForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> examinationsHistory = new ArrayList<ExaminationDto>();
        for(Appointment appointment : appointmentService.getExaminationsHistoryForPatient(patientId)) {
            examinationsHistory.add(ExaminationMapper.convertToDto(appointment));
        }
        if(examinationsHistory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(examinationsHistory, HttpStatus.OK);
    }
}
