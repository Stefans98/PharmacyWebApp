package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionItem;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
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

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<Void> generateQRCode() {
        EPrescriptionItemDto dto = new EPrescriptionItemDto();
        dto.setMedicineCode("L123");
        dto.setMedicineName("Brufen");
        dto.setQuantity(10);
        List<EPrescriptionItemDto> medicines = new ArrayList<>();
        medicines.add(dto);
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
}
