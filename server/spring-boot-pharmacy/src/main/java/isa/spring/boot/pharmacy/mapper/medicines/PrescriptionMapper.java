package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.users.Patient;

public class PrescriptionMapper {

    public static Prescription convertToEntity(PrescriptionDto dto) {
        Prescription prescription = new Prescription();
        prescription.setTherapyDayLength(dto.getTherapyDayLength());
        return prescription;
    }
}
