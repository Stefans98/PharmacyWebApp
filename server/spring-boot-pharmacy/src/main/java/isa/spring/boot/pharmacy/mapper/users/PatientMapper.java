package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Patient;

import java.util.ArrayList;

public class PatientMapper {

    public static Patient convertToEntity(PatientDto patientDto, boolean alreadyExist) {
        Patient patient = new Patient();

        if (alreadyExist) {
            patient.setId(patientDto.getId());
        }
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhoneNumber(patientDto.getPhoneNumber());
        patient.setAddress(new Address(patientDto.getCountry(), patientDto.getCity(),
                patientDto.getStreet(), patient));
        patient.setPassword(patientDto.getPassword(), false);
        patient.setPoints(0);
        patient.setAllergies(new ArrayList<>());

        return patient;
    }

    public static PatientDto convertToDto(Patient patient) {
        PatientDto patientDto = new PatientDto();

        patientDto.setId(patient.getId());
        patientDto.setFirstName(patient.getFirstName());
        patientDto.setLastName(patient.getLastName());
        patientDto.setEmail(patient.getEmail());
        patientDto.setPhoneNumber(patient.getPhoneNumber());
        patientDto.setCity(patient.getAddress().getCity());
        patientDto.setCountry(patient.getAddress().getCountry());
        patientDto.setStreet(patient.getAddress().getStreet());
        patientDto.setPassword(null);
        patientDto.setPoints(patient.getPoints());

        return patientDto;
    }
}
