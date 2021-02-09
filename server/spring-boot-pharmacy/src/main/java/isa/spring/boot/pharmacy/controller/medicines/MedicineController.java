package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineInquiryDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineReservationDto;
import isa.spring.boot.pharmacy.dto.schedule.AnnualStatistics;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineReservationMapper;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineInquiry;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.service.medicines.MedicineInquiryService;
import isa.spring.boot.pharmacy.service.medicines.MedicineReservationService;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.medicines.PharmacyMedicineService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private MedicineReservationService medicineReservationService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    @Autowired
    private MedicineInquiryService medicineInquiryService;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<MedicineDto> createMedicine(@RequestBody MedicineDto medicineDto) {
        if (medicineService.findByCode(medicineDto.getCode()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Medicine medicine = medicineService.save(MedicineMapper.convertToEntity(medicineDto),
                medicineDto.getMedicineSpecification().getSubstitutionsCodes());
        return new ResponseEntity<>(MedicineMapper.convertToDto(medicine), HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    //@PreAuthorize("hasAnyAuthority('PATIENT', 'PHARMACY_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<List<MedicineDto>> getMedicines() {
        List<MedicineDto> medicineDto = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.findAll()) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }

        @GetMapping(value = "/getMedicinesToWhichPatientIsNotAllergic/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineDto>> getMedicinesToWhichPatientIsNotAllergic(@PathVariable Long patientId) {
        List<MedicineDto> medicineDto = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.getMedicinesToWhichPatientIsNotAllergic(patientId)) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }

    @GetMapping(value = "/getMedicinesToWhichPatientIsAllergic/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineDto>> getMedicinesToWhichPatientIsAllergic(@PathVariable Long patientId) {
        List<MedicineDto> medicineDto = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.getMedicinesToWhichPatientIsAllergic(patientId)) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }

    @GetMapping(value = "/findMedicinesBy/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineDto>> findMedicinesBy(@PathVariable String name) {
        List<MedicineDto> medicineDto = new ArrayList<>();
        for (Medicine medicine : medicineService.findMedicinesBy(name)) {
            medicineDto.add(MedicineMapper.convertToDto(medicine));
        }

        if (medicineDto.isEmpty()){
            return new ResponseEntity<>(medicineDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicineDto, HttpStatus.OK);
    }

    @GetMapping(value="/getMedicinePrice/medicinePrice", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<Double> getMedicinePriceFromPharmacy(@RequestParam String medicineId, @RequestParam String pharmacyId){
        double medicinePrice = pharmacyService.getMedicinePriceFromPharmacy(Long.parseLong(medicineId), Long.parseLong(pharmacyId));
        if (medicinePrice == 0.0) {
            return new ResponseEntity<>(medicinePrice, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicinePrice, HttpStatus.OK);
    }

    @PostMapping (value = "/reserveMedicine", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<Void> reserveMedicine(@RequestBody MedicineReservationDto medicineReservationDto) {
        MedicineReservation medicineReservation = medicineReservationService.reserveMedicine(MedicineReservationMapper.convertToEntity(medicineReservationDto),
                medicineReservationDto.getMedicineId(), medicineReservationDto.getPharmacyId(), medicineReservationDto.getPatientId());
        if (medicineReservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getAllReservedMedicinesByPatientId/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<MedicineReservationDto>> getAllReservedMedicinesByPatientId(@PathVariable Long patientId) {
        List<MedicineReservationDto> medicineReservationDto = new ArrayList<>();
        for(MedicineReservation medicineReservation : medicineReservationService.getAllReservedMedicinesByPatientId(patientId)) {
            medicineReservationDto.add(MedicineReservationMapper.convertToDto(medicineReservation,
                    pharmacyService.getMedicinePriceFromPharmacy(medicineReservation.getMedicine().getId(), medicineReservation.getPharmacy().getId())));
        }

        if (medicineReservationDto.isEmpty()) {
            return new ResponseEntity<>(medicineReservationDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicineReservationDto, HttpStatus.OK);
    }

    @PutMapping(value = "/cancelMedicineReservation", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<MedicineReservationDto> cancelMedicineReservation(@RequestBody MedicineReservationDto medicineReservationDto){
        MedicineReservation medicineReservation = medicineReservationService.findById(medicineReservationDto.getId());
        if (medicineReservation == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!medicineReservationService.cancelMedicineReservation(medicineReservation)){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(MedicineReservationMapper.convertToDto(medicineReservation, 0.0), HttpStatus.OK);
    }

    @GetMapping(value="/getMedicineSubstitutions/{medicineId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST')")
    public ResponseEntity<List<MedicineDto>> getMedicineSubstitutions(@PathVariable Long medicineId){
        List<MedicineDto> medicineSubstitutionsDto = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.getMedicineSubstitutions(medicineId)) {
            medicineSubstitutionsDto.add(MedicineMapper.convertToDto(medicine));
        }

        if (medicineSubstitutionsDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicineSubstitutionsDto, HttpStatus.OK);
    }

    @GetMapping(value="/isMedicineAvailable", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST')")
    public ResponseEntity<MedicineDto> isMedicineAvailable(@RequestParam String medicineId, @RequestParam String pharmacyId){
        Medicine medicine = pharmacyMedicineService.isMedicineAvailable(Long.parseLong(medicineId), Long.parseLong(pharmacyId));
        if(medicine == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(MedicineMapper.convertToDto(medicine), HttpStatus.OK);
    }

    @GetMapping(value="/findAllMedicinesForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST','PHARMACY_ADMIN')")
    public ResponseEntity<List<MedicineDto>> findAllMedicinesForPharmacy(@PathVariable Long pharmacyId){
        List<MedicineDto> medicinesForPharmacy = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.findAllMedicinesForPharmacy(pharmacyId)) {
            medicinesForPharmacy.add(MedicineMapper.convertToDto(medicine));
        }

        if(medicinesForPharmacy.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicinesForPharmacy, HttpStatus.OK);
    }

    @PostMapping (value = "/saveMedicineInquiry", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST')")
    public ResponseEntity<Void> saveMedicineInquiry(@RequestBody MedicineInquiryDto medicineReservationDto) {
        MedicineInquiry medicineInquiry = medicineInquiryService.saveMedicineInquiry(medicineReservationDto.getPharmacy().getId(),
                medicineReservationDto.getEmployee().getId(), medicineReservationDto.getMedicine().getId());
        if (medicineInquiry == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value="/findMedicineReservationByUniqueCode", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<MedicineReservationDto> findMedicineReservationByUniqueCode(@RequestParam String uniqueCode, @RequestParam String pharmacyId){
        MedicineReservation medicineReservation = medicineReservationService.findMedicineReservationByUniqueCode(uniqueCode, Long.parseLong(pharmacyId));
        if(medicineReservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(MedicineReservationMapper.convertToDto(medicineReservation, 0), HttpStatus.OK);
    }

    @PutMapping(value="/issueMedicineReservation/{medicineReservationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<MedicineReservationDto> issueMedicineReservation(@PathVariable Long medicineReservationId){
        MedicineReservation medicineReservation = medicineReservationService.issueMedicineReservation(medicineReservationId);
        if(medicineReservation == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(MedicineReservationMapper.convertToDto(medicineReservation, 0), HttpStatus.OK);
    }

    @GetMapping(value="/getQuantityOfMedicineForPharmacy", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST','PHARMACY_ADMIN')")
    public ResponseEntity<Double> getQuantityOfMedicineForPharmacy(@RequestParam String medicineId, @RequestParam String pharmacyId){
        double medicineQuantity = pharmacyMedicineService.getQuantityOfMedicineForPharmacy(Long.parseLong(medicineId), Long.parseLong(pharmacyId));
        return new ResponseEntity<>(medicineQuantity, HttpStatus.OK);
    }

    @GetMapping(value="/findAllMedicinesNotForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST','PHARMACY_ADMIN')")
    public ResponseEntity<List<MedicineDto>> findAllMedicinesNotForPharmacy(@PathVariable Long pharmacyId){
        List<MedicineDto> medicinesForPharmacy = new ArrayList<MedicineDto>();
        for(Medicine medicine : medicineService.findAllMedicinesNotForPharmacy(pharmacyId)) {
            medicinesForPharmacy.add(MedicineMapper.convertToDto(medicine));
        }

        if(medicinesForPharmacy.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(medicinesForPharmacy, HttpStatus.OK);
    }

    @GetMapping(value = "/medicineStatistic/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<AnnualStatistics> medicineStatistic(@PathVariable Long pharmacyId) {
        AnnualStatistics annualStatistics = medicineReservationService.medicineStatistic(pharmacyId);
        if(annualStatistics == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(annualStatistics, HttpStatus.OK);
    }

    @GetMapping(value = "/calculatePharmacyProfit/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<AnnualStatistics> calculatePharmacyProfit(@PathVariable Long pharmacyId, @RequestParam String startDate, @RequestParam String endDate) throws ParseException {
        //Date startTime =new SimpleDateFormat("dd/MM/yyyy").parse(startDate);
        //Date endTime =new SimpleDateFormat("dd/MM/yyyy").parse(endDate);
        Date startTime = new Date(Long.valueOf(startDate));
        Date endTime = new Date(Long.valueOf(endDate));
        AnnualStatistics annualStatistics = medicineReservationService.calculatePharmacyProfit(pharmacyId, startTime, endTime);
        if(annualStatistics == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(annualStatistics, HttpStatus.OK);
    }
}
