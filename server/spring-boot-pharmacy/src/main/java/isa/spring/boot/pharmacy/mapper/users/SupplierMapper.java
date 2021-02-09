package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.SupplierDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Supplier;

public class SupplierMapper {

    public static SupplierDto convertToDto(Supplier supplier) {
        SupplierDto dto = new SupplierDto();

        dto.setId(supplier.getId());
        dto.setFirstName(supplier.getFirstName());
        dto.setLastName(supplier.getLastName());
        dto.setEmail(supplier.getEmail());
        dto.setPhoneNumber(supplier.getPhoneNumber());
        dto.setCity(supplier.getAddress().getCity());
        dto.setCountry(supplier.getAddress().getCountry());
        dto.setStreet(supplier.getAddress().getStreet());
        dto.setPassword(null);

        return dto;
    }

    public static Supplier convertToEntity(SupplierDto dto, boolean alreadyExist) {
        Supplier supplier = new Supplier();

        if (alreadyExist) {
            supplier.setId(dto.getId());
        }
        supplier.setFirstName(dto.getFirstName());
        supplier.setLastName(dto.getLastName());
        supplier.setEmail(dto.getEmail());
        supplier.setPhoneNumber(dto.getPhoneNumber());
        supplier.setAddress(new Address(dto.getCountry(), dto.getCity(),
                dto.getStreet(), supplier));
        supplier.setPassword(dto.getPassword(), false);

        return supplier;
    }
}
