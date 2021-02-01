package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.PharmacyAdministratorDto;
import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.model.users.User;

public class PharmacyAdministratorMapper {

    public static PharmacyAdministrator convertToEntity(PharmacyAdministratorDto dto, boolean alreadyExist) {
        PharmacyAdministrator pharmacyAdministrator = new PharmacyAdministrator();

        if (alreadyExist) {
            pharmacyAdministrator.setId(dto.getId());
        }
        pharmacyAdministrator.setFirstName(dto.getFirstName());
        pharmacyAdministrator.setLastName(dto.getLastName());
        pharmacyAdministrator.setEmail(dto.getEmail());
        pharmacyAdministrator.setPhoneNumber(dto.getPhoneNumber());
        pharmacyAdministrator.setAddress(new Address(dto.getCountry(), dto.getCity(),
                dto.getStreet(), pharmacyAdministrator));
        pharmacyAdministrator.setPassword(dto.getPassword(), false);

        return pharmacyAdministrator;
    }
}
