package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationHistoryDto;
import isa.spring.boot.pharmacy.mapper.schedule.ExaminationHistoryMapper;
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
@RequestMapping(value="api/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping(value = "/getExaminationsHistoryForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<ExaminationHistoryDto>> getExaminationsHistoryForPatient(@PathVariable Long patientId) {
        List<ExaminationHistoryDto> examinationsHistory = new ArrayList<ExaminationHistoryDto>();
        for(Appointment appointment : appointmentService.getExaminationsHistoryForPatient(patientId)) {
            examinationsHistory.add(ExaminationHistoryMapper.convertToDto(appointment));
        }
        return new ResponseEntity<>(examinationsHistory, HttpStatus.OK);
    }
}
