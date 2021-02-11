package isa.spring.boot.pharmacy.controller.schedule;

import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;
import isa.spring.boot.pharmacy.dto.schedule.AnnualStatistics;
import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.dto.schedule.AppointmentReportDto;
import isa.spring.boot.pharmacy.mapper.medicines.PrescriptionMapper;
import isa.spring.boot.pharmacy.mapper.schedule.AppointmentMapper;
import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.mapper.schedule.AppointmentReportMapper;
import isa.spring.boot.pharmacy.mapper.schedule.ExaminationMapper;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.model.schedule.AppointmentType;
import isa.spring.boot.pharmacy.service.pharmacy.PricelistService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentReportService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentReportService appointmentReportService;

    @Autowired
    private PricelistService pricelistService;

    @GetMapping(value = "/findById/{appointmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACIST','DERMATOLOGIST')")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable long appointmentId) {
        Appointment appointment = appointmentService.findById(appointmentId);
        if (appointment == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(AppointmentMapper.convertToDto(appointment), HttpStatus.OK);
    }

    @GetMapping(value = "/getExaminationsHistoryForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PATIENT')")
    public ResponseEntity<List<ExaminationDto>> getExaminationsHistoryForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> examinationsHistory = new ArrayList<>();
        for(Appointment appointment : appointmentService.getExaminationsHistoryForPatient(patientId)) {
            examinationsHistory.add(ExaminationMapper.convertToDto(appointment));
        }
        if(examinationsHistory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(examinationsHistory, HttpStatus.OK);
    }

    @GetMapping(value = "/getCounselingsHistoryForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACIST','PATIENT')")
    public ResponseEntity<List<ExaminationDto>> getCounselingsHistoryForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> counselingsHistory = new ArrayList<>();
        for (Appointment appointment : appointmentService.getCounselingsHistoryForPatient(patientId)) {
            counselingsHistory.add(ExaminationMapper.convertToDto(appointment));
        }
        if (counselingsHistory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(counselingsHistory, HttpStatus.OK);
    }
    
    @GetMapping(value = "/getScheduledExaminationForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<ExaminationDto>> getScheduledExaminationForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> examinations = new ArrayList<>();
        for(Appointment appointment : appointmentService.getScheduledExaminationForPatient(patientId)) {
            examinations.add(ExaminationMapper.convertToDto(appointment));
        }
        if(examinations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(examinations, HttpStatus.OK);
    }

    @GetMapping(value = "/getScheduledCounselingForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<ExaminationDto>> getScheduledCounselingForPatient(@PathVariable Long patientId) {
        List<ExaminationDto> counselings = new ArrayList<>();
        for(Appointment appointment : appointmentService.getScheduledCounselingForPatient(patientId)) {
            counselings.add(ExaminationMapper.convertToDto(appointment));
        }
        if(counselings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(counselings, HttpStatus.OK);
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

    @GetMapping(value = "/getAllAvailableExaminationTermsForDermatologist/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<AppointmentDto>> getAllAvailableExaminationTermsForDermatologist(@PathVariable Long dermatologistId) {
        List<AppointmentDto> availableExaminationTermsForDermatologist = new ArrayList<AppointmentDto>();
        for(Appointment appointment : appointmentService.getAllAvailableExaminationTermsForDermatologist(dermatologistId)) {
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
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST','PATIENT','PHARMACY_ADMIN')")
    public ResponseEntity<AppointmentDto> scheduleExamination(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = appointmentService.scheduleAppointment(AppointmentMapper.convertToEntity(appointmentDto),
                appointmentDto.getPatient().getId(), appointmentDto.getWorkDay().getId());
        if(appointment == null) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }

        try {
            if(appointment.getAppointmentType() == AppointmentType.EXAMINATION) {
                appointmentService.sendEmailForExamination(appointment);
            } else if(appointment.getAppointmentType() == AppointmentType.COUNSELING) {
                appointmentService.sendEmailForCounseling(appointment);
            }
        } catch( Exception ignored ){ }
        return new ResponseEntity<>(AppointmentMapper.convertToDto(appointment), HttpStatus.OK);
    }

    @PutMapping(value = "/cancelExamination", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<ExaminationDto> cancelExamination(@RequestBody ExaminationDto examinationDto){
        Appointment appointment = appointmentService.findById(examinationDto.getId());
        if (appointment == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!appointmentService.cancelExamination(appointment)){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(ExaminationMapper.convertToDto(appointment), HttpStatus.OK);
    }

    @PostMapping(value = "/saveAppointmentReport", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST')")
    public ResponseEntity<Void> saveAppointmentReport(@RequestBody AppointmentReportDto appointmentReportDto) {
        List<Prescription> prescriptions = new ArrayList<Prescription>();
        if(appointmentReportDto.getPrescriptions() != null) {
            for(PrescriptionDto prescriptionDto : appointmentReportDto.getPrescriptions()) {
                prescriptions.add(PrescriptionMapper.convertToEntity(prescriptionDto));
            }
        }
        AppointmentReport appointmentReport = appointmentReportService.saveAppointmentReport(AppointmentReportMapper.convertToEntity(appointmentReportDto),
                appointmentReportDto.getAppointment().getPatient().getId(), appointmentReportDto.getAppointment().getWorkDay().getId(), prescriptions);
        if(appointmentReport == null) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/findOccupiedAppointmentsByPatientEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('PHARMACIST','DERMATOLOGIST')")
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

    @GetMapping(value = "/getAppointmentPrice", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST','PHARMACIST')")
    public ResponseEntity<Double> getAppointmentPrice(@RequestParam String reservationDate, @RequestParam String startTime, @RequestParam String endTime, @RequestParam String pharmacyId)  throws ParseException {
        double price = pricelistService.getCounselingPriceByDateAndPharmacyId(reservationDate, Long.parseLong(pharmacyId));
        double appointmentPrice = pricelistService.calculateAppointmentPrice(price, startTime, endTime);
        return new ResponseEntity<>(appointmentPrice, HttpStatus.OK);
    }

    @GetMapping(value = "/appointmentStatistic/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<AnnualStatistics> appointmentStatistic(@PathVariable Long pharmacyId) {
        AnnualStatistics annualStatistics = appointmentService.appointmentStatistic(pharmacyId);
        if(annualStatistics == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(annualStatistics, HttpStatus.OK);
    }

    @GetMapping(value = "/getFreeAppointmentForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACY_ADMIN','PATIENT')")
    public ResponseEntity<List<AppointmentDto>> getFreeAppointmentForPharmacy(@PathVariable Long pharmacyId) {
        List<AppointmentDto> freeAppointments = new ArrayList<>();
        for(Appointment appointment : appointmentService.getFreeDermatologistsAppointmentForPharmacy(pharmacyId)) {
            freeAppointments.add(AppointmentMapper.convertToDto(appointment));
        }

        if (freeAppointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(freeAppointments, HttpStatus.OK);
    }

    @GetMapping(value = "/getExaminationsForDermatologistWorkCalendar/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('DERMATOLOGIST')")
    public ResponseEntity<List<AppointmentDto>> getExaminationsForDermatologistWorkCalendar(@PathVariable Long dermatologistId) {
        List<AppointmentDto> dermatologistExaminations = new ArrayList<>();
        for(Appointment appointment : appointmentService.getExaminationsForDermatologistWorkCalendar(dermatologistId)) {
            dermatologistExaminations.add(AppointmentMapper.convertToDto(appointment));
        }

        if (dermatologistExaminations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dermatologistExaminations, HttpStatus.OK);
    }

    @GetMapping(value = "/getCounselingsForPharmacistWorkCalendar/{pharmacistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<List<AppointmentDto>> getCounselingsForPharmacistWorkCalendar(@PathVariable Long pharmacistId) {
        List<AppointmentDto> pharmacistCounselings = new ArrayList<>();
        for(Appointment appointment : appointmentService.getCounselingsForPharmacistWorkCalendar(pharmacistId)) {
            pharmacistCounselings.add(AppointmentMapper.convertToDto(appointment));
        }

        if (pharmacistCounselings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacistCounselings, HttpStatus.OK);
    }
}
