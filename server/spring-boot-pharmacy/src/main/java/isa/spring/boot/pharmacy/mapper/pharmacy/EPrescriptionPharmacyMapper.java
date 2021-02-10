package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.EPrescriptionPharmacyDto;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

public class EPrescriptionPharmacyMapper {

    public static EPrescriptionPharmacyDto convertToDto(Pharmacy pharmacy, double price) {
        EPrescriptionPharmacyDto dto = new EPrescriptionPharmacyDto();

        dto.setPharmacy(PharmacyMapper.convertToDto(pharmacy));
        dto.setPrice(price);

        return dto;
    }
}
