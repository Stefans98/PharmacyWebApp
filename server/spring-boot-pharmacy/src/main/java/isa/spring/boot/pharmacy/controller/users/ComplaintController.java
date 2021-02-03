package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.medicines.OfferDto;
import isa.spring.boot.pharmacy.dto.users.ComplaintDto;
import isa.spring.boot.pharmacy.mapper.medicines.OfferMapper;
import isa.spring.boot.pharmacy.mapper.users.ComplaintMapper;
import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.model.users.Complaint;
import isa.spring.boot.pharmacy.model.users.DermatologistComplaint;
import isa.spring.boot.pharmacy.model.users.PharmacistComplaint;
import isa.spring.boot.pharmacy.service.users.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping(value = "/sendDermatologistComplaint", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<ComplaintDto> sendDermatologistComplaint(@RequestBody ComplaintDto complaintDto) {
        DermatologistComplaint dermatologistComplaint = (DermatologistComplaint) ComplaintMapper.convertToEntity(complaintDto);
        Complaint complaint = complaintService.saveDermatologistComplaint(dermatologistComplaint,
                            complaintDto.getPatientId(), complaintDto.getDermatologistId());
        return new ResponseEntity<>(ComplaintMapper.convertToDto(complaint), HttpStatus.OK);
    }

    @PostMapping(value = "/sendPharmacistComplaint", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<ComplaintDto> sendPharmacistComplaint(@RequestBody ComplaintDto complaintDto) {
        PharmacistComplaint pharmacistComplaint = (PharmacistComplaint) ComplaintMapper.convertToEntity(complaintDto);
        Complaint complaint = complaintService.savePharmacistComplaint(pharmacistComplaint,
                complaintDto.getPatientId(), complaintDto.getPharmacistId());
        return new ResponseEntity<>(ComplaintMapper.convertToDto(complaint), HttpStatus.OK);
    }
}
