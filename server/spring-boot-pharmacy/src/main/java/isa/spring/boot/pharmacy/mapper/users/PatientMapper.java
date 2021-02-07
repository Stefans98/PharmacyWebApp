package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Allergy;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.UserCategory;

import java.util.ArrayList;
import java.util.List;

public class PatientMapper {

    public static Patient convertToEntity(PatientDto patientDto, boolean alreadyExist) {
        Patient patient = new Patient();

        if (alreadyExist) {
            patient.setId(patientDto.getId());
            List<Allergy> allergies = new ArrayList<>();
            for (Medicine medicine: patientDto.getMedicines()) {
                Allergy allergy = new Allergy();
                allergy.setMedicine(medicine);
                allergy.setPatient(patient);
                allergy.setName(medicine.getName());
                allergies.add(allergy);
            }
            patient.setAllergies(allergies);
        }
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhoneNumber(patientDto.getPhoneNumber());
        patient.setAddress(new Address(patientDto.getCountry(), patientDto.getCity(),
                patientDto.getStreet(), patient));
        patient.setPassword(patientDto.getPassword(), false);
        patient.setPoints(patientDto.getPoints());

        if (patientDto.getUserCategory() == 0) {
            patient.setUserCategory(UserCategory.REGULAR);
        } else if (patientDto.getUserCategory() == 1) {
            patient.setUserCategory(UserCategory.SILVER);
        } else {
            patient.setUserCategory(UserCategory.GOLD);
        }

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
        patientDto.setUserCategory(patient.getUserCategory().ordinal());

        return patientDto;
    }
}
