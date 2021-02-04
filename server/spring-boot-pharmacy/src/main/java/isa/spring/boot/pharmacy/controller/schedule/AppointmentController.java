package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.medicines.MedicineReservationDto;
import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineReservationMapper;
import isa.spring.boot.pharmacy.mapper.schedule.AppointmentMapper;
import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.mapper.schedule.ExaminationMapper;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.service.schedule.AppointmentReportService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sun.reflect.generics.tree.VoidDescriptor;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/appointments")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    AppointmentReportService appointmentReportService;

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

    @GetMapping(value = "/getCounselingsHistoryForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<List<ExaminationDto>> getCounselingsHistoryForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> counselingsHistory = new ArrayList<ExaminationDto>();
        for(Appointment appointment : appointmentService.getCounselingsHistoryForPatient(patientId)) {
            counselingsHistory.add(ExaminationMapper.convertToDto(appointment));
        }
        if(counselingsHistory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(counselingsHistory, HttpStatus.OK);
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

    @GetMapping(value = "/getAvailableExaminationTermsForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<AppointmentDto>> getAvailableExaminationTermsForPharmacy(@PathVariable Long pharmacyId) {
        List<AppointmentDto> availableExaminationTermsForPharmacy = new ArrayList<>();
        for(Appointment appointment : appointmentService.getAvailableExaminationTermsForPharmacy(pharmacyId)) {
            availableExaminationTermsForPharmacy.add(AppointmentMapper.convertToDto(appointment));
        }

        if (availableExaminationTermsForPharmacy.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(availableExaminationTermsForPharmacy, HttpStatus.OK);
    }

    @PostMapping(value = "/scheduleExamination", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST','PATIENT')")
    public ResponseEntity<AppointmentDto> scheduleExamination(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = appointmentService.scheduleAppointment(AppointmentMapper.convertToEntity(appointmentDto),
                appointmentDto.getPatient().getId(), appointmentDto.getWorkDay().getId());
        if(appointment == null) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(AppointmentMapper.convertToDto(appointment), HttpStatus.OK);
    }

    @PostMapping(value = "/saveAppointmentReport", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST')")
    public ResponseEntity<Void> saveAppointmentReport(@RequestBody AppointmentDto appointmentDto) {
        AppointmentReport appointmentReport = appointmentReportService.saveAppointmentReport(AppointmentMapper.convertToEntity(appointmentDto));
        if(appointmentReport == null) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/findOccupiedAppointmentsByPatientEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST')")
    public ResponseEntity<List<AppointmentDto>> findOccupiedAppointmentsByPatientEmail(@RequestParam String patientEmail,@RequestParam String employeeId) {
        List<AppointmentDto> occupiedAppointmentsByPatientEmail = new ArrayList<AppointmentDto>();
        if(appointmentService.findOccupiedAppointmentsByPatientEmail(patientEmail, Long.parseLong(employeeId)) == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        for(Appointment appointment : appointmentService.findOccupiedAppointmentsByPatientEmail(patientEmail, Long.parseLong(employeeId))) {
            occupiedAppointmentsByPatientEmail.add(AppointmentMapper.convertToDto(appointment));
        }
        if(occupiedAppointmentsByPatientEmail.isEmpty()) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(occupiedAppointmentsByPatientEmail, HttpStatus.OK);
    }

    @PutMapping(value = "/patientNotHeldOnAppointment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACIST','DERMATOLOGIST')")
    public ResponseEntity<Void> patientNotHeldOnAppointment(@RequestBody AppointmentDto appointmentDto){
        Appointment appointment = appointmentService.patientNotHeldOnAppointment(AppointmentMapper.convertToEntity(appointmentDto),
                appointmentDto.getPatient().getId(), appointmentDto.getWorkDay().getId());
        if(appointment == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
