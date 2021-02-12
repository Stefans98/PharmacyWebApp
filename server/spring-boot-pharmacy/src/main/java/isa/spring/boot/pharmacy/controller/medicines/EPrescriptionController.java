package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionDto;
import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.mapper.medicines.EPrescriptionMapper;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.model.medicines.EPrescription;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionItem;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionState;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.service.medicines.EPrescriptionService;
import isa.spring.boot.pharmacy.service.qrcode.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/eprescriptions")
public class EPrescriptionController {

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private EPrescriptionService ePrescriptionService;

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<Void> generateQRCode() {
        EPrescriptionItemDto dto1 = new EPrescriptionItemDto("L126", "Diklofenak", 1);
        EPrescriptionItemDto dto2 = new EPrescriptionItemDto("L124", "Nimulid", 14);
        EPrescriptionItemDto dto3 = new EPrescriptionItemDto("L127", "Bromazepam", 3);
        EPrescriptionItemDto dto4 = new EPrescriptionItemDto("L123", "Brufen", 4);
        EPrescriptionItemDto dto5 = new EPrescriptionItemDto("L128", "Lorazepam", 4);
        List<EPrescriptionItemDto> medicines = new ArrayList<>();
        medicines.add(dto1);
        medicines.add(dto2);
        medicines.add(dto3);
        medicines.add(dto4);
        medicines.add(dto5);
        try {
            qrCodeService.generateQRCode(medicines);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/read", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<EPrescriptionItemDto>> readMedicinesFromQRCode(@RequestParam MultipartFile image) {
        List<EPrescriptionItemDto> medicines = new ArrayList<>();
        try {
            medicines = qrCodeService.decodeQRCode(image);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<EPrescriptionDto> createNewEPrescription(@RequestBody EPrescriptionDto ePrescriptionDto) {
        EPrescription ePrescription = ePrescriptionService.createEPrescription(EPrescriptionMapper.convertToEntity(ePrescriptionDto),
                ePrescriptionDto.getPatientId(), ePrescriptionDto.getPharmacyId(), ePrescriptionDto.getMedicineCodesWithQuantities());
        if (ePrescription == null) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } else if (ePrescription.getePrescriptionState() == EPrescriptionState.REJECTED) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        ePrescriptionService.sendEmailForEPrescription(ePrescription);
        return new ResponseEntity<>(EPrescriptionMapper.convertToDto(ePrescription), HttpStatus.OK);
    }

    @GetMapping(value = "/getAllForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<EPrescriptionDto>> getAllForPatient(@PathVariable Long patientId) {
        List<EPrescription> ePrescriptions = ePrescriptionService.getEPrescriptionsForPatient(patientId);
        List<EPrescriptionDto> ePrescriptionDtos = new ArrayList<>();
        for (EPrescription ePrescription : ePrescriptions) {
            ePrescriptionDtos.add(EPrescriptionMapper.convertToDto(ePrescription));
        }
        return new ResponseEntity<>(ePrescriptionDtos, HttpStatus.OK);
    }

}
