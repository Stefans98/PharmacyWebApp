package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.mapper.schedule.AppointmentMapper;
import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.mapper.schedule.ExaminationMapper;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "/getAvailableExaminationTermsForDermatologist/{dermatologistId}/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<AppointmentDto>> getAvailableExaminationTermsForDermatologist(@PathVariable Long dermatologistId, @PathVariable Long pharmacyId) {
        List<AppointmentDto> availableExaminationTermsForDermatologist = new ArrayList<AppointmentDto>();
        for(Appointment appointment : appointmentService.getAvailableExaminationTermsForDermatologist(dermatologistId, pharmacyId)) {
            availableExaminationTermsForDermatologist.add(AppointmentMapper.convertToDto(appointment));
        }
        return new ResponseEntity<>(availableExaminationTermsForDermatologist, HttpStatus.OK);
    }

    @PostMapping(value = "/scheduleExamination", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<AppointmentDto> scheduleExamination(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = appointmentService.scheduleAppointment(AppointmentMapper.convertToEntity(appointmentDto),
                appointmentDto.getPatient().getId(), appointmentDto.getWorkDay().getId());
        if(appointment == null) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(AppointmentMapper.convertToDto(appointment), HttpStatus.OK);
    }
}
