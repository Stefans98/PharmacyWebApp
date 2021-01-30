package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

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

        return pharmacyDto;
    }
}
