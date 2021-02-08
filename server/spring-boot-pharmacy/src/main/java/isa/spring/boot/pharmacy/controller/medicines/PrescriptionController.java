package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineReservationDto;
import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineReservationMapper;
import isa.spring.boot.pharmacy.mapper.medicines.PrescriptionMapper;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.repository.medicines.PrescriptionRepository;
import isa.spring.boot.pharmacy.service.medicines.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping(value = "/savePrescription", produces = MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('DERMATOLOGIST', 'PHARMACIST')")
    public ResponseEntity<PrescriptionDto> savePrescription(@RequestBody PrescriptionDto prescriptionDto) {
        Prescription prescription = prescriptionService.savePrescription(PrescriptionMapper.convertToEntity(prescriptionDto),
                prescriptionDto.getMedicine().getId(), prescriptionDto.getPatient().getId(), prescriptionDto.getPharmacyId());
        if(prescription == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(PrescriptionMapper.convertToDto(prescription), HttpStatus.OK);
    }
}
