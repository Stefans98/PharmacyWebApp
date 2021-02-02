package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value = "api/patients")
public class PatientController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/findById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) {
        Patient patient = (Patient)userService.findById(id);
        if (patient == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(PatientMapper.convertToDto(patient), HttpStatus.OK);
    }

    @PutMapping(value = "/updateProfile/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<PatientDto> updatePatient(@PathVariable(value = "id") Long patientId, @RequestBody PatientDto patientDto) throws  Exception{
        Patient patient = (Patient)userService.findById(patientId);
        if (patient == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Patient updatedPatient = userService.updatePatient(PatientMapper.convertToEntity(patientDto, true));
        if (updatedPatient == null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(PatientMapper.convertToDto(updatedPatient), HttpStatus.OK);
    }

}
