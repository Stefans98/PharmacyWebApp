package isa.spring.boot.pharmacy.controller.users;

import isa.spring.boot.pharmacy.dto.users.GradeDto;
import isa.spring.boot.pharmacy.mapper.users.GradeMapper;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.service.users.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @PostMapping(value = "/gradeDermatologist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<GradeDto> gradeDermatologist(@RequestBody GradeDto gradeDto) {
        DermatologistGrade dermatologistGrade = (DermatologistGrade) GradeMapper.convertToEntity(gradeDto);
        Grade grade = gradeService.saveDermatologistGrade(dermatologistGrade,
                gradeDto.getPatientId(), gradeDto.getDermatologistId());
        if (grade == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(GradeMapper.convertToDto(grade), HttpStatus.OK);
    }

    @PostMapping(value = "/gradePharmacist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<GradeDto> gradePharmacist(@RequestBody GradeDto gradeDto) {
        PharmacistGrade pharmacistGrade = (PharmacistGrade) GradeMapper.convertToEntity(gradeDto);
        Grade grade = gradeService.savePharmacistGrade(pharmacistGrade,
                gradeDto.getPatientId(), gradeDto.getPharmacistId());
        if (grade == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(GradeMapper.convertToDto(grade), HttpStatus.OK);
    }

    @PostMapping(value = "/gradePharmacy", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<GradeDto> gradePharmacy(@RequestBody GradeDto gradeDto) {
        PharmacyGrade pharmacyGrade = (PharmacyGrade) GradeMapper.convertToEntity(gradeDto);
        Grade grade  = gradeService.savePharmacyGrade(pharmacyGrade,
                gradeDto.getPatientId(), gradeDto.getPharmacyId());
        if (grade == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(GradeMapper.convertToDto(grade), HttpStatus.OK);
    }

    @PostMapping(value = "/gradeMedicine", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<GradeDto> gradeMedicine(@RequestBody GradeDto gradeDto) {
        MedicineGrade medicineGrade = (MedicineGrade) GradeMapper.convertToEntity(gradeDto);
        Grade grade  = gradeService.saveMedicineGrade(medicineGrade,
                gradeDto.getPatientId(), gradeDto.getMedicineId());
        if (grade == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(GradeMapper.convertToDto(grade), HttpStatus.OK);
    }

}
