package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.UserCategory;

public class PatientMapper {
    public static PatientDto ConvertToDto(Patient patient) {
        PatientDto dto = new PatientDto();
        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setStreet(patient.getAddress().getStreet());
        dto.setCity(patient.getAddress().getCity());
        dto.setCountry(patient.getAddress().getCountry());
        dto.setEmail(patient.getEmail());
        dto.setPassword(null);
        dto.setPhoneNumber(patient.getPhoneNumber());
        dto.setPoints(patient.getPoints());
        //dto.setUserCategory(patient.getUserCategory().ordinal());
        return dto;
    }

    public static Patient ConvertToEntity(PatientDto dto) {
        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setAddress(new Address(dto.getCountry(), dto.getCity(), dto.getStreet()));
        patient.setEmail(dto.getEmail());
        patient.setPassword(dto.getPassword());
        patient.setPhoneNumber(dto.getPhoneNumber());
        patient.setPoints(dto.getPoints());
        //patient.setUserCategory(UserCategory.values()[dto.getUserCategory()]);
        return patient;
    }
}
