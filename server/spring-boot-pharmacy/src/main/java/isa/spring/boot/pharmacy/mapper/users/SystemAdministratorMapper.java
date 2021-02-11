package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.SupplierDto;
import isa.spring.boot.pharmacy.dto.users.SystemAdministratorDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Supplier;
import isa.spring.boot.pharmacy.model.users.SystemAdministrator;

public class SystemAdministratorMapper {

    public static SystemAdministratorDto convertToDto(SystemAdministrator systemAdministrator) {
        SystemAdministratorDto dto = new SystemAdministratorDto();

        dto.setId(systemAdministrator.getId());
        dto.setFirstName(systemAdministrator.getFirstName());
        dto.setLastName(systemAdministrator.getLastName());
        dto.setEmail(systemAdministrator.getEmail());
        dto.setPhoneNumber(systemAdministrator.getPhoneNumber());
        dto.setCity(systemAdministrator.getAddress().getCity());
        dto.setCountry(systemAdministrator.getAddress().getCountry());
        dto.setStreet(systemAdministrator.getAddress().getStreet());
        dto.setPassword(null);

        return dto;
    }

    public static SystemAdministrator convertToEntity(SystemAdministratorDto dto, boolean alreadyExist) {
        SystemAdministrator systemAdministrator = new SystemAdministrator();

        if (alreadyExist) {
            systemAdministrator.setId(dto.getId());
        }
        systemAdministrator.setFirstName(dto.getFirstName());
        systemAdministrator.setLastName(dto.getLastName());
        systemAdministrator.setEmail(dto.getEmail());
        systemAdministrator.setPhoneNumber(dto.getPhoneNumber());
        systemAdministrator.setAddress(new Address(dto.getCountry(), dto.getCity(),
                dto.getStreet(), systemAdministrator));
        systemAdministrator.setPassword(dto.getPassword(), false);

        return systemAdministrator;
    }
}
