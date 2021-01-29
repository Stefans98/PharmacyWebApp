package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.DermatologistPatientDto;
import isa.spring.boot.pharmacy.model.users.Patient;

public class DermatologistPatientMapper {

    public static DermatologistPatientDto convertToDto(Patient patient) {

        DermatologistPatientDto dto = new DermatologistPatientDto();

        dto.setPatientId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmailAddress(patient.getEmail());
        dto.setContactNumber(patient.getPhoneNumber());

        return dto;
    }
}
