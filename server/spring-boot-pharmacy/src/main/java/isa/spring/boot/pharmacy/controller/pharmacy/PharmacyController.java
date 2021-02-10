package isa.spring.boot.pharmacy.controller.pharmacy;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import isa.spring.boot.pharmacy.dto.pharmacy.EPrescriptionPharmacyDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.mapper.medicines.EPrescriptionItemMapper;
import isa.spring.boot.pharmacy.mapper.pharmacy.EPrescriptionPharmacyMapper;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.schedule.AppointmentMapper;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.service.medicines.PharmacyMedicineService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.pharmacy.PricelistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value="api/pharmacies")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private PricelistService pricelistService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<PharmacyDto> registerPharmacy(@RequestBody PharmacyDto pharmacyDto)
    {
        Pharmacy pharmacy = pharmacyService.savePharmacy(PharmacyMapper.convertToEntity(pharmacyDto));

        return new ResponseEntity<>(PharmacyMapper.convertToDto(pharmacy), HttpStatus.CREATED);
    }

    @GetMapping(value="/getAllPharmacies", produces = MediaType.APPLICATION_JSON_VALUE)
    //@PreAuthorize("hasAnyAuthority('PATIENT', 'PHARMACY_ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<List<PharmacyDto>> getAllPharmacies() {
        List<PharmacyDto> pharmacyDto = new ArrayList<>();
        for(Pharmacy pharmacy :  pharmacyService.getAllPharmacies()) {
            pharmacyDto.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if (pharmacyDto.isEmpty()) {
            return new ResponseEntity<>(pharmacyDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value = "/getPharmaciesWithAvailablePharmacistsByDateTime", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesWithAvailablePharmacistsByDateTime(@RequestParam String reservationDate, @RequestParam String startTime, @RequestParam String endTime) throws ParseException {
        List<PharmacyDto> pharmaciesDto = new ArrayList<>();
        for(Pharmacy pharmacy :  pharmacyService.getPharmaciesWithAvailablePharmacistsByDateTime(reservationDate, startTime, endTime)) {
            double price = pricelistService.getCounselingPriceByDateAndPharmacyId(reservationDate, pharmacy.getId());
            pharmaciesDto.add(PharmacyMapper.convertToDtoWithPrice(pharmacy, this.pricelistService.calculateAppointmentPrice(price, startTime, endTime)));
        }

        if(pharmaciesDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<PharmacyDto> pharmaciesDtoWithoutDuplicates = pharmacyService.removePharmaciesDuplicates(pharmaciesDto);
        return new ResponseEntity<>(pharmaciesDtoWithoutDuplicates, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmaciesByMedicineId/{medicineId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesByMedicineId(@PathVariable Long medicineId){
        List<PharmacyDto> pharmacyDto = new ArrayList<>();
        for(Pharmacy pharmacy :  pharmacyService.getPharmaciesByMedicineId(medicineId)) {
            pharmacyDto.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if (pharmacyDto.isEmpty()) {
            return new ResponseEntity<>(pharmacyDto, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmacyByPharmacyAdmin/{pharmacyAdminId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<PharmacyDto> getPharmacyByPharmacyAdmin(@PathVariable Long pharmacyAdminId){
        PharmacyDto pharmacyDto = PharmacyMapper.convertToDto(pharmacyService.getPharmacyByPharmacyAdmin(pharmacyAdminId));
        if(pharmacyDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmacyByPharmacist/{pharmacistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACIST')")
    public ResponseEntity<PharmacyDto> getPharmacyByPharmacist(@PathVariable Long pharmacistId){
        PharmacyDto pharmacyDto = PharmacyMapper.convertToDto(pharmacyService.getPharmacyByPharmacist(pharmacistId));
        if(pharmacyDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pharmacyDto, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmaciesByDermatologist/{dermatologistId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACY_ADMIN','DERMATOLOGIST','PATIENT')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesByDermatologist(@PathVariable Long dermatologistId){
        List<PharmacyDto> pharmaciesForDermatologist = new ArrayList<>();
        if(pharmacyService.getPharmaciesForDermatologist(dermatologistId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Pharmacy pharmacy : pharmacyService.getPharmaciesForDermatologist(dermatologistId)){
            pharmaciesForDermatologist.add(PharmacyMapper.convertToDto(pharmacy));
        }

        if(pharmaciesForDermatologist.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(pharmaciesForDermatologist, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmaciesForPatientAppointmentsAndReservations/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<PharmacyDto>> getPharmaciesForPatientAppointmentsAndReservations(@PathVariable Long patientId) {
        List<PharmacyDto> pharmacyDtos = new ArrayList<>();
        List<Pharmacy> pharmacies = pharmacyService.getPharmaciesForPatientAppointmentsAndReservations(patientId);
        for (Pharmacy pharmacy : pharmacies) {
            pharmacyDtos.add(PharmacyMapper.convertToDto(pharmacy));
        }
        return new ResponseEntity<>(pharmacyDtos, HttpStatus.OK);
    }

    @GetMapping(value="/getPharmacyById/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('PHARMACY_ADMIN', 'PATIENT')")
    public ResponseEntity<PharmacyDto> getPharmacyById(@PathVariable Long pharmacyId){
        Pharmacy pharmacy = pharmacyService.getPharmacyById(pharmacyId);
        if(pharmacy == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(PharmacyMapper.convertToDto(pharmacy), HttpStatus.OK);
    }

    @GetMapping(value="/getAllWithMedicine/{code}", produces = MediaType.APPLICATION_JSON_VALUE)
    //@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<List<PharmacyDto>> getPharmacyById(@PathVariable String code){
        List<PharmacyDto> pharmacyDtos = new ArrayList<>();
        for (Pharmacy pharmacy : pharmacyMedicineService.getAllPharmaciesWithMedicine(code)) {
            pharmacyDtos.add(PharmacyMapper.convertToDto(pharmacy));
        }
        return new ResponseEntity<>(pharmacyDtos, HttpStatus.OK);
    }

    @PostMapping(value = "/updatePharmacy", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<PharmacyDto> updatePharmacy(@RequestBody PharmacyDto pharmacyDto) {
        Pharmacy pharmacy = pharmacyService.savePharmacy(PharmacyMapper.convertToEntityWithId(pharmacyDto));

        return new ResponseEntity<>(PharmacyMapper.convertToDto(pharmacy), HttpStatus.OK);
    }

    @PutMapping(value="/pharmaciesWithEPrescriptionItems", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<EPrescriptionPharmacyDto>> findAllPharmaciesWithEPrescriptionItems(@RequestBody List<EPrescriptionItemDto> items) {
        List<EPrescriptionPharmacyDto> dtos = new ArrayList<>();
        HashMap<Long, Double> pharmacyPrices = pharmacyMedicineService.getPharmaciesAndPricesForMedicines(
                EPrescriptionItemMapper.convertEPrescriptionItemsToMap(items)
        );
        for (Long pharmacyId : pharmacyPrices.keySet()) {
            dtos.add(EPrescriptionPharmacyMapper.convertToDto(pharmacyService.findById(pharmacyId),
                    pharmacyPrices.get(pharmacyId)));
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

}
