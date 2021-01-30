package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.DermatologistDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Dermatologist;

public class DermatologistMapper {

    public static Dermatologist convertToEntity(DermatologistDto dermatologistDto, boolean alreadyExist) {
        Dermatologist dermatologist = new Dermatologist();

        if (alreadyExist) {
            dermatologist.setId(dermatologistDto.getId());
        }
        dermatologist.setFirstName(dermatologistDto.getFirstName());
        dermatologist.setLastName(dermatologistDto.getLastName());
        dermatologist.setEmail(dermatologistDto.getEmail());
        dermatologist.setPhoneNumber(dermatologistDto.getPhoneNumber());
        dermatologist.setAddress(new Address(dermatologistDto.getCountry(), dermatologistDto.getCity(),
                dermatologistDto.getStreet(), dermatologist));
        dermatologist.setPassword(dermatologistDto.getPassword(), false);

        return dermatologist;
    }

    public static DermatologistDto convertToDto(Dermatologist dermatologist) {
        DermatologistDto dermatologistDto = new DermatologistDto();

        dermatologistDto.setId(dermatologist.getId());
        dermatologistDto.setFirstName(dermatologist.getFirstName());
        dermatologistDto.setLastName(dermatologist.getLastName());
        dermatologistDto.setEmail(dermatologist.getEmail());
        dermatologistDto.setPhoneNumber(dermatologist.getPhoneNumber());
        dermatologistDto.setCity(dermatologist.getAddress().getCity());
        dermatologistDto.setCountry(dermatologist.getAddress().getCountry());
        dermatologistDto.setStreet(dermatologist.getAddress().getStreet());
        dermatologistDto.setPassword(null);

        return dermatologistDto;
    }
}
