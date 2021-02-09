package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.users.Patient;

public class PrescriptionMapper {

    public static Prescription convertToEntity(PrescriptionDto dto) {
        Prescription prescription = new Prescription();
        if(dto.getId() != null) {
            prescription.setId(dto.getId());
        }
        prescription.setTherapyDayLength(dto.getTherapyDayLength());
        return prescription;
    }

    public static PrescriptionDto convertToDto(Prescription prescription) {
        PrescriptionDto dto = new PrescriptionDto();
        dto.setId(prescription.getId());
        dto.setTherapyDayLength(prescription.getTherapyDayLength());
        dto.setMedicine(MedicineMapper.convertToDto(prescription.getMedicine()));
        dto.setPatient(PatientMapper.convertToDto(prescription.getPatient()));
        return dto;
    }

}
