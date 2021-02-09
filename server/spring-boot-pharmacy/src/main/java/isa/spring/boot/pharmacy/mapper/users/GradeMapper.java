package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.GradeDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.model.users.*;

public class GradeMapper {
    public static GradeDto convertToDto(Grade grade) {
        GradeDto dto = new GradeDto();

        switch (grade.getDiscriminatorValue()) {
            case "PHARMACY_GRADE":
                PharmacyGrade pharmacyGrade = (PharmacyGrade) grade;
                dto.setPharmacy(PharmacyMapper.convertToDto(pharmacyGrade.getPharmacy()));
                dto.setPharmacyId(pharmacyGrade.getPharmacy().getId());
                break;
            case "PHARMACIST_GRADE":
                PharmacistGrade pharmacistGrade = (PharmacistGrade) grade;
                dto.setPharmacist(PharmacistMapper.convertToDto(pharmacistGrade.getPharmacist()));
                dto.setPharmacyId(pharmacistGrade.getPharmacist().getId());
                break;
            case "DERMATOLOGIST_GRADE":
                DermatologistGrade dermatologistGrade = (DermatologistGrade) grade;
                dto.setDermatologist(DermatologistMapper.convertToDto(dermatologistGrade.getDermatologist()));
                dto.setDermatologistId(dermatologistGrade.getDermatologist().getId());
                break;
            case "MEDICINE_GRADE":
                MedicineGrade medicineGrade = (MedicineGrade) grade;
                dto.setMedicine(MedicineMapper.convertToDto(medicineGrade.getMedicine()));
                dto.setMedicineId(medicineGrade.getMedicine().getId());
                break;
        }
        dto.setId(grade.getId());
        dto.setGrade(grade.getGrade());
        dto.setGradeType(grade.getDiscriminatorValue());
        dto.setPatient(PatientMapper.convertToDto(grade.getPatient()));

        return dto;
    }

    public static Grade convertToEntity(GradeDto dto) {
        Grade grade = null;
        switch (dto.getGradeType()) {
            case "PHARMACY_GRADE":
                grade = new PharmacyGrade();
                break;
            case "PHARMACIST_GRADE":
                grade = new PharmacistGrade();
                break;
            case "DERMATOLOGIST_GRADE":
                grade = new DermatologistGrade();
                break;
            case "MEDICINE_GRADE":
                grade = new MedicineGrade();
                break;
        }

        if (grade != null) {
            grade.setGrade(dto.getGrade());
        }

        return grade;
    }
}
