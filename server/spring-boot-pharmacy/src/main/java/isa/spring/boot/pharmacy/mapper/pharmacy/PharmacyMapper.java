package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Address;

public class PharmacyMapper {

    public static PharmacyDto convertToDto(Pharmacy pharmacy){
        PharmacyDto pharmacyDto = new PharmacyDto();

        pharmacyDto.setId(pharmacy.getId());
        pharmacyDto.setName(pharmacy.getName());
        pharmacyDto.setCity(pharmacy.getAddress().getCity());
        pharmacyDto.setCountry(pharmacy.getAddress().getCountry());
        pharmacyDto.setStreet(pharmacy.getAddress().getStreet());
        pharmacyDto.setDescription(pharmacy.getDescription());
        pharmacyDto.setAverageGrade(pharmacy.getAverageGrade());
        pharmacyDto.setAddress(pharmacy.getAddress().getCity() + ", " + pharmacy.getAddress().getStreet());

        return pharmacyDto;
    }

    public static PharmacyDto convertToDtoWithPrice(Pharmacy pharmacy, double price) {
        PharmacyDto pharmacyDto = convertToDto(pharmacy);
        pharmacyDto.setPrice(price);
        return pharmacyDto;
    }

    public static Pharmacy convertToEntity(PharmacyDto pharmacyDto){
        Pharmacy pharmacy = new Pharmacy();

        pharmacy.setName(pharmacyDto.getName());
        pharmacy.setAddress(new Address(pharmacyDto.getCountry(), pharmacyDto.getCity(), pharmacyDto.getStreet()));
        pharmacy.setDescription(pharmacyDto.getDescription());
        pharmacy.setAverageGrade(0.0);

        return pharmacy;
    }
}
