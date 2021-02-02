package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.DermatologistDto;
import isa.spring.boot.pharmacy.dto.users.PharmacistDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;

public class PharmacistMapper {

    public static Pharmacist convertToEntity(PharmacistDto pharmacistDto, boolean alreadyExist) {
        Pharmacist pharmacist = new Pharmacist();

        if (alreadyExist) {
            pharmacist.setId(pharmacistDto.getId());
        }
        pharmacist.setFirstName(pharmacistDto.getFirstName());
        pharmacist.setLastName(pharmacistDto.getLastName());
        pharmacist.setEmail(pharmacistDto.getEmail());
        pharmacist.setPhoneNumber(pharmacistDto.getPhoneNumber());
        pharmacist.setAddress(new Address(pharmacistDto.getCountry(), pharmacistDto.getCity(),
                pharmacistDto.getStreet(), pharmacist));
        pharmacist.setPassword(pharmacistDto.getPassword(), false);

        return pharmacist;
    }

    public static PharmacistDto convertToDto(Pharmacist pharmacist) {
        PharmacistDto pharmacistDto = new PharmacistDto();

        pharmacistDto.setId(pharmacist.getId());
        pharmacistDto.setFirstName(pharmacist.getFirstName());
        pharmacistDto.setLastName(pharmacist.getLastName());
        pharmacistDto.setEmail(pharmacist.getEmail());
        pharmacistDto.setPhoneNumber(pharmacist.getPhoneNumber());
        pharmacistDto.setCity(pharmacist.getAddress().getCity());
        pharmacistDto.setCountry(pharmacist.getAddress().getCountry());
        pharmacistDto.setStreet(pharmacist.getAddress().getStreet());
        pharmacistDto.setAverageGrade(pharmacist.getAverageGrade());
        pharmacistDto.setPassword(null);

        return pharmacistDto;
    }
}
