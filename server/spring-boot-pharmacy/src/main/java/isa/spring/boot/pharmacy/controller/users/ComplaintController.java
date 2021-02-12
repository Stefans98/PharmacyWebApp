package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.users.ComplaintAnswerDto;
import isa.spring.boot.pharmacy.dto.users.ComplaintDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.ComplaintAnswerMapper;
import isa.spring.boot.pharmacy.mapper.users.ComplaintMapper;
import isa.spring.boot.pharmacy.model.users.*;
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

    @PostMapping(value = "/sendPharmacyComplaint", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<ComplaintDto> sendPharmacyComplaint(@RequestBody ComplaintDto complaintDto) {
        PharmacyComplaint pharmacyComplaint = (PharmacyComplaint) ComplaintMapper.convertToEntity(complaintDto);
        Complaint complaint = complaintService.savePharmacyComplaint(pharmacyComplaint,
                complaintDto.getPatientId(), complaintDto.getPharmacyId());
        return new ResponseEntity<>(ComplaintMapper.convertToDto(complaint), HttpStatus.OK);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<List<ComplaintDto>> getAllComplaints(){
        List<ComplaintDto> complaintDtos = new ArrayList<>();
        List<Complaint> complaints = complaintService.findAll();
        for (Complaint complaint : complaints) {
            complaintDtos.add(ComplaintMapper.convertToDto(complaint));
        }
        return new ResponseEntity<>(complaintDtos, HttpStatus.OK);
    }

    @PostMapping(value = "/answerComplaint", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
    public ResponseEntity<ComplaintAnswerDto> answerComplaint(@RequestBody ComplaintAnswerDto complaintAnswerDto) {
        ComplaintAnswer complaintAnswer = complaintService.saveComplaintAnswer(ComplaintAnswerMapper.convertToEntity(complaintAnswerDto),
                complaintAnswerDto.getComplaintId());
        if (complaintAnswer == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        complaintService.sendComplaintAnswerMail(complaintAnswer);
        return new ResponseEntity<>(ComplaintAnswerMapper.convertToDto(complaintAnswer), HttpStatus.OK);
    }
}
